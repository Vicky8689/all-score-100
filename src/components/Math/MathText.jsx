
import React from "react";
import { InlineMath, BlockMath } from "react-katex";
import "katex/dist/katex.min.css";

// ======================================================
// CLEAN LATEX
// ======================================================

const cleanLatex = (value) => {
    if (value === null || value === undefined) {
        return "";
    }

    let text = String(value);

    // Unicode differential symbol
    text = text.replace(/ⅆ/g, "d");

    // Non-breaking space
    text = text.replace(/\u00A0/g, " ");

    // --------------------------------------------------
    // Fix accidental double slash before LaTeX commands
    //
    // Example:
    // \\tan  -> \tan
    // \\frac -> \frac
    //
    // IMPORTANT:
    // This is only for repeated backslashes before
    // known LaTeX commands.
    // --------------------------------------------------

    text = text.replace(
        /\\\\(?=(frac|sqrt|int|sum|prod|log|ln|sin|cos|tan|cot|sec|csc|pi|alpha|beta|gamma|theta|left|right|cdot|times|lim|infty)\b)/g,
        "\\"
    );

    // Common malformed LaTeX
    text = text.replace(/\\\s+/g, "\\ ");

    return text.trim();
};


// ======================================================
// LATEX COMMANDS
// ======================================================

const LATEX_COMMANDS =
    "frac|sqrt|int|sum|prod|log|ln|sin|cos|tan|cot|sec|csc|" +
    "pi|alpha|beta|gamma|theta|lambda|mu|sigma|delta|" +
    "left|right|cdot|times|div|lim|infty|pm|neq|leq|geq|" +
    "rightarrow|to|text|mathrm|mathbf|overline|underline";


// ======================================================
// DETECT LATEX
// ======================================================

const isLatexCommand = (text) => {
    if (!text) {
        return false;
    }

    return new RegExp(
        `\\\\(${LATEX_COMMANDS})\\b|[\\^_]`
    ).test(text);
};


// ======================================================
// FIND LATEX COMMAND
// ======================================================

const getLatexCommand = (text, index) => {

    if (text[index] !== "\\") {
        return null;
    }

    const match = text
        .substring(index)
        .match(
            new RegExp(
                `^\\\\(${LATEX_COMMANDS})\\b`
            )
        );

    return match ? match[0] : null;
};


// ======================================================
// READ BALANCED GROUP
//
// Reads:
// {abc}
// {\\frac{x}{y}}
// {\\sqrt{x+1}}
//
// Returns the index after the closing brace.
// ======================================================

const readBalancedGroup = (text, startIndex) => {

    if (text[startIndex] !== "{") {
        return startIndex;
    }

    let depth = 0;

    for (let i = startIndex; i < text.length; i++) {

        if (text[i] === "{") {
            depth++;
        }

        if (text[i] === "}") {
            depth--;

            if (depth === 0) {
                return i + 1;
            }
        }
    }

    return text.length;
};


// ======================================================
// READ LATEX EXPRESSION
// ======================================================

const readLatexExpression = (text, startIndex) => {

    let i = startIndex;

    // ------------------------------------------
    // Read first command
    // ------------------------------------------

    const command = getLatexCommand(text, i);

    if (!command) {
        return null;
    }

    i += command.length;

    // ------------------------------------------
    // Commands such as:
    //
    // \left(
    // \right)
    // \sin
    // \log
    // \int
    // ------------------------------------------

    while (i < text.length) {

        const ch = text[i];

        // --------------------------------------
        // Skip spaces inside math
        // --------------------------------------

        if (/\s/.test(ch)) {

            /*
             * If the next character looks like normal
             * English text, stop.
             *
             * Example:
             *
             * \int ... dx then
             *
             * "then" should remain normal text.
             */

            const remaining = text.substring(i).trimStart();

            if (
                remaining &&
                !remaining.startsWith("\\") &&
                !/^[{_^}\d()+\-*/=.,]/.test(remaining)
            ) {
                break;
            }

            i++;
            continue;
        }

        // --------------------------------------
        // Another LaTeX command
        // --------------------------------------

        if (ch === "\\") {

            const nextCommand = getLatexCommand(text, i);

            if (nextCommand) {
                i += nextCommand.length;
                continue;
            }

            // Unknown command
            i++;
            continue;
        }

        // --------------------------------------
        // Braced group
        // --------------------------------------

        if (ch === "{") {

            i = readBalancedGroup(text, i);
            continue;
        }

        // --------------------------------------
        // Superscript / subscript
        //
        // x^2
        // x^{2}
        // x_1
        // x_{n+1}
        // --------------------------------------

        if (ch === "^" || ch === "_") {

            i++;

            if (i < text.length && text[i] === "{") {
                i = readBalancedGroup(text, i);
            } else if (i < text.length) {
                i++;
            }

            continue;
        }

        // --------------------------------------
        // Normal mathematical characters
        // --------------------------------------

        if (
            /[a-zA-Z0-9()+\-*/=.,:;[\]]/.test(ch)
        ) {
            i++;
            continue;
        }

        // --------------------------------------
        // Stop at obvious sentence text
        // --------------------------------------

        break;
    }

    return {
        value: text.substring(startIndex, i).trim(),
        endIndex: i
    };
};


// ======================================================
// RENDER MIXED TEXT + LATEX
// ======================================================

const renderMixedText = (text) => {

    if (!text) {
        return null;
    }

    const parts = [];

    let currentText = "";
    let i = 0;

    while (i < text.length) {

        // ==================================================
        // LATEX START
        // ==================================================

        if (text[i] === "\\") {

            const command = getLatexCommand(text, i);

            if (command) {

                // ------------------------------------------
                // Add normal text before LaTeX
                // ------------------------------------------

                if (currentText) {

                    parts.push({
                        type: "text",
                        value: currentText
                    });

                    currentText = "";
                }

                // ------------------------------------------
                // Read complete mathematical expression
                // ------------------------------------------

                const result = readLatexExpression(
                    text,
                    i
                );

                if (result && result.value) {

                    parts.push({
                        type: "math",
                        value: result.value
                    });

                    i = result.endIndex;

                    continue;
                }
            }
        }

        // ==================================================
        // SUPERSCRIPT / SUBSCRIPT
        //
        // Example:
        //
        // x^2
        // x_{n}
        // ==================================================

        if (
            text[i] === "^" ||
            text[i] === "_"
        ) {

            /*
             * If there is already normal text before it,
             * try to identify the complete mathematical
             * expression.
             */

            const previous = currentText;

            if (previous) {

                // Find the beginning of the current word
                const match = previous.match(
                    /([a-zA-Z0-9().]+)$/
                );

                if (match) {

                    const base = match[1];

                    currentText =
                        previous.substring(
                            0,
                            previous.length - base.length
                        );

                    const start = i - base.length;

                    const mathCandidate =
                        text.substring(start);

                    const mathMatch =
                        mathCandidate.match(
                            /^[a-zA-Z0-9().]+(?:\^[{]?[a-zA-Z0-9+\-()]+[}]?)?(?:_[{]?[a-zA-Z0-9+\-()]+[}]?)?/
                        );

                    if (mathMatch) {

                        parts.push({
                            type: "math",
                            value: mathMatch[0]
                        });

                        i =
                            start +
                            mathMatch[0].length;

                        continue;
                    }
                }
            }
        }

        // ==================================================
        // NORMAL TEXT
        // ==================================================

        currentText += text[i];

        i++;
    }

    // ==================================================
    // REMAINING TEXT
    // ==================================================

    if (currentText) {

        parts.push({
            type: "text",
            value: currentText
        });
    }

    // ==================================================
    // RENDER PARTS
    // ==================================================

    return parts.map((part, index) => {

        // ----------------------------------------------
        // LATEX
        // ----------------------------------------------

        if (part.type === "math") {

            try {

                return (
                    <InlineMath
                        key={index}
                        math={part.value}
                    />
                );

            } catch (error) {

                console.error(
                    "KaTeX Error:",
                    part.value,
                    error
                );

                return (
                    <span
                        key={index}
                        className="latex-error"
                    >
                        {part.value}
                    </span>
                );
            }
        }

        // ----------------------------------------------
        // NORMAL TEXT
        // ----------------------------------------------

        return (
            <React.Fragment key={index}>
                {part.value}
            </React.Fragment>
        );
    });
};


// ======================================================
// MATH TEXT COMPONENT
// ======================================================

const MathText = ({
    children,
    className = ""
}) => {

    // ==================================================
    // NULL CHECK
    // ==================================================

    if (
        children === null ||
        children === undefined
    ) {
        return null;
    }

    // ==================================================
    // CLEAN
    // ==================================================

    const cleaned = cleanLatex(children);

    if (!cleaned) {
        return null;
    }

    // ==================================================
    // ENTIRE STRING IS LATEX
    // ==================================================

    if (
        isLatexCommand(cleaned) &&
        cleaned.startsWith("\\")
    ) {

        try {

            return (
                <div className={className}>
                    <BlockMath math={cleaned} />
                </div>
            );

        } catch (error) {

            console.error(
                "KaTeX Error:",
                cleaned,
                error
            );

            // Fall back to mixed renderer
        }
    }

    // ==================================================
    // MIXED TEXT + LATEX
    // ==================================================

    const lines = cleaned.split(/\r?\n/);

    return (
        <div className={className}>

            {lines.map((line, index) => {

                // --------------------------------------
                // Empty line
                // --------------------------------------

                if (!line.trim()) {

                    return (
                        <div
                            key={index}
                            style={{
                                height: "8px"
                            }}
                        />
                    );
                }

                // --------------------------------------
                // Render line
                // --------------------------------------

                return (
                    <div
                        key={index}
                        className="question-normal-text"
                    >
                        {renderMixedText(line)}
                    </div>
                );
            })}

        </div>
    );
};

export default MathText;

