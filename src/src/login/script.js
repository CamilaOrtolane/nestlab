document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const response = await fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.status === 200) {
            // Redirecionar para a página de sucesso ou fazer o que for necessário após o login
            alert('Login bem-sucedido');
        } else {
            // Exibir uma mensagem de erro ou lidar com o erro de autenticação
            alert('Falha no login. Verifique suas credenciais.');
        }
    });
});