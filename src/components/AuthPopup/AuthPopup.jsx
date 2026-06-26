import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { LockOutlined, LoginOutlined, PersonAddOutlined } from "@mui/icons-material";
import "./AuthPopup.css";
/**
 * AuthPopup — listens for the custom "auth:unauthorized" event
 * dispatched by the Axios interceptor in api.js.
 *
 * When a 401 is detected, this renders a small premium modal
 * with "Login" and "Register" buttons that navigate to "/".
 */
const AuthPopup = () => {
    const [visible, setVisible] = useState(false);
    const navigate = useNavigate();
    const handleUnauthorized = useCallback(() => {
        setVisible(true);
    }, []);
    useEffect(() => {
        window.addEventListener("auth:unauthorized", handleUnauthorized);
        return () => {
            window.removeEventListener("auth:unauthorized", handleUnauthorized);
        };
    }, [handleUnauthorized]);
    if (!visible) return null;
    const handleLogin = () => {
        setVisible(false);
        // Clear stale user data
        localStorage.removeItem("user");
        navigate("/");
    };
    const handleRegister = () => {
        setVisible(false);
        localStorage.removeItem("user");
        // Navigate to auth page — the register tab can be pre-selected
        // by passing state that AuthTabs can read
        navigate("/", { state: { tab: "register" } });
    };
    const handleDismiss = () => {
        setVisible(false);
    };
    return (
        <div className="auth-popup-overlay" onClick={handleDismiss}>
            <div className="auth-popup-card" onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="auth-popup-header">
                    <div className="auth-popup-icon-ring">
                        <LockOutlined />
                    </div>
                    <h3 className="auth-popup-title">Session Expired</h3>
                    <p className="auth-popup-desc">
                        Your session has expired or you are not logged in.
                        Please sign in to continue.
                    </p>
                </div>
                {/* Body */}
                <div className="auth-popup-body">
                    <button className="auth-popup-btn auth-popup-btn-login" onClick={handleLogin}>
                        <LoginOutlined /> Sign In to Your Account
                    </button>
                    <div className="auth-popup-divider">
                        <span>or</span>
                    </div>
                    <button className="auth-popup-btn auth-popup-btn-register" onClick={handleRegister}>
                        <PersonAddOutlined /> Create New Account
                    </button>
                    <div className="auth-popup-dismiss">
                        <button onClick={handleDismiss}>Dismiss</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default AuthPopup;
