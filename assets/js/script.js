async function getUserInfo() {
  const username = document.getElementById('github-username').value;
  const userInfoDiv = document.getElementById('user-info');

  // Limpar o conteúdo anterior
  userInfoDiv.innerHTML = '';

  if (username) {
    const url = `https://api.github.com/users/${username}`;

    try {
      const response = await fetch(url);

      if (response.ok) {
        const user = await response.json();

        // Exibir informações do usuário
        userInfoDiv.innerHTML = `
          <img src="${user.avatar_url}" alt="${user.login}">
          <h2>${user.name || user.login}</h2>
          <p><strong>Bio:</strong> ${user.bio || 'Não disponível'}</p>
          <p><strong>Localização:</strong> ${user.location || 'Não disponível'}</p>
          <p><strong>Repositórios públicos:</strong> ${user.public_repos}</p>
          <p><strong>Seguidores:</strong> ${user.followers}</p>
          <p><strong>Seguindo:</strong> ${user.following}</p>
          <p><a href="${user.html_url}" target="_blank">Visitar perfil no GitHub</a></p>
        `;
      } else {
        userInfoDiv.innerHTML = `<p>Usuário não encontrado</p>`;
      }
    } catch (error) {
      userInfoDiv.innerHTML = `<p>Erro ao buscar dados do usuário</p>`;
      console.error('Erro:', error);
    }
  } else {
    userInfoDiv.innerHTML = `<p>Por favor, insira um nome de usuário válido</p>`;
  }
}
