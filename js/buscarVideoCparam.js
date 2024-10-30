import { conectaApi } from "./conectaApi.js";
import constroiCard from "./mostrarVideos.js"; // vamos reaproveitar a função que faz o que precisamos e escrever menos codigo

const pesquisa = document.querySelector("[data-pesquisa]");
const button = document.querySelector("[data-button-pesquisar]");

async function buscarVideoClient(evento){
    evento.preventDefault();
    const videoEncontrado = await conectaApi.buscarVideosServer(pesquisa.value);
    const lista = document.querySelector("[data-lista]"); // selecionamos o elemento ul, atraves do data atribute data-lista

    // vamos apagar a lista de video que é apresentada pela listagem padrão de videos
    // ou seja: apagremos a listagem que mostra todos os videos, para que a pesquisa de videos especificos
    // possa exibir somente os videos que tem relação com o parametro informado na pesquisa de videos

    while (lista.firstChild){ // emquanto tiver um primeiro filho:
        lista.removeChild(lista.firstChild); // remova filho, que seja o primeiro filho
        /** assim enquanto tiver um filho dentro da lista "ul" sera feito o loop removendo sempre o primeiro 
         * filho até zerar  a lista "limpar a tela", deixando todo o espasso de visualização disponivel
         * apenas para a lista de item da busca de videos relacionado ao parametro informado na pesquisa
          */
    }


    // abaixo estamos pegando o retorno da requisição de busca dos video ralacionado a palavra chave da pesquisa
    // e percorrendo esse retorno com um forEach, e para cada objeto encontrado armazenado em  "elemento", 
    // nos pegamos a ul que selecionamos e armazenamos na const lista, chamamos o metodo appendChild()
    // lista.appendChild() e passamos como argumento a função constroiCard() e para função constroiCardi()
    // passamos as propriedade do objeto ou objetos armazenado em elemento, essas propriedade seraão atribuidas aos li
    // na função constroi card, e formarão a nova estrutura li, que exibira o conteudo encontrado""
    videoEncontrado.forEach(elemento => lista.appendChild(
        constroiCard(elemento.descricao,elemento.imagem,elemento.titulo,elemento.url)
    ));

    if(videoEncontrado.length == 0){
        lista.innerHTML= `<h2 class="mensagem__titulo"> não existe video relacionado a palavra chave informada</h2>`
    }
}

button.addEventListener("click",evento => buscarVideoClient(evento))
// a linha de cima poderia ser escrita da seguinte forma:
/**
 * button.addEventListener("click",function(event){
 *      buscarVideosCliente(event);      
 * });
 */