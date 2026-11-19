const campoNome = document.querySelector('.davi');
const campoData = document.querySelector('.data-camp');
const campoHora = document.querySelector('.hora-camp');
const campoImg = document.querySelector('.img-camp');
const botao = document.querySelector('.orelha');
const lista = document.querySelector('.lista-campeonatos');

let campeonatos = JSON.parse(localStorage.getItem('listaCampeonatos')) || [];

function mostrarNaTela() {
  lista.innerHTML = '';

  campeonatos.forEach((item, index) => {
    const li = document.createElement('li');

    if (item.imagem) {
      const img = document.createElement('img');
      img.src = item.imagem;
      img.style.width = '80px';
      img.style.display = 'block';
      li.appendChild(img);
    }

    const texto = document.createElement('span');
    texto.textContent = `${item.nome} - Data: ${item.data} às ${item.hora} `;
    li.appendChild(texto);

    const btnAcabar = document.createElement('button');
    btnAcabar.textContent = 'Encerrar';
    btnAcabar.addEventListener('click', () => {
      campeonatos.splice(index, 1);
      localStorage.setItem('listaCampeonatos', JSON.stringify(campeonatos));
      mostrarNaTela();
    });

    li.appendChild(btnAcabar);
    lista.appendChild(li);
  });
}

mostrarNaTela();

function salvarItem(nome, dataFormatada, hora, imagemBase64) {
  campeonatos.push({
    nome: nome,
    data: dataFormatada,
    hora: hora,
    imagem: imagemBase64
  });

  localStorage.setItem('listaCampeonatos', JSON.stringify(campeonatos));
  mostrarNaTela();

  campoNome.value = '';
  campoData.value = '';
  campoHora.value = '';
  campoImg.value = '';
}

botao.addEventListener('click', () => {
  const nome = campoNome.value.trim();
  const dataOriginal = campoData.value;
  const hora = campoHora.value;
  const arquivo = campoImg.files[0];

  if (nome === '' || dataOriginal === '' || hora === '') {
    alert('Por favor, preencha o nome, a data e a hora!');
    return;
  }

  const dataFormatada = dataOriginal.split('-').reverse().join('/');

  if (arquivo) {
    const leitor = new FileReader();
    leitor.onload = function (evento) {
      salvarItem(nome, dataFormatada, hora, evento.target.result);
    };
    leitor.readAsDataURL(arquivo);
  } else {
    salvarItem(nome, dataFormatada, hora, null);
  }
});
