import './style.css'

document.querySelector('#app').innerHTML = `
  <div class="login-box">
    <div class="avatar"></div>
    <div class="tabs">
      <span class="active">Login</span>
      <span>Sign Up</span>
    </div>
    <form class="login-form">
      <input type="email" placeholder="Email" required />
      <input type="password" placeholder="Password" required />
      <button type="submit">Submit</button>
      <a href="#" class="forgot">Forget your password?</a>
    </form>
  </div>
`

document.querySelector('.login-form').addEventListener('submit', (e) => {
  e.preventDefault()
  alert("Giriş başarılı! (şimdilik sadece örnek)");
})
