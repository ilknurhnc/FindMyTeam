const Login = () => {
    return <div class="auth-container">
    <div class="auth-box glass">
        <div class="auth-avatar">
            <i class="fas fa-running"></i>
        </div>
        <div class="auth-tabs" id="authTabs">
            <button class="tab-btn active" data-tab="login">
                <i class="fas fa-sign-in-alt"></i> Giriş Yap
            </button>
            <button class="tab-btn" data-tab="register">
                <i class="fas fa-user-plus"></i> Kayıt Ol
            </button>
        </div>
        <form id="loginForm">
            <div class="form-group">
                <input type="email" class="form-input" placeholder="✉️ E-posta adresiniz" required/>
            </div>
            <div class="form-group">
                <input type="password" class="form-input" placeholder="🔒 Şifreniz" required/>
            </div>
            <button type="submit" class="submit-btn">
                <span class="btn-text">
                    <i class="fas fa-sign-in-alt"></i> Giriş Yap
                </span>
            </button>
        </form>
    </div>
</div>;
}

export default Login