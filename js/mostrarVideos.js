import { conectaApi } from "./conectaApi.js"; // importamos uma propriedade chamada conectaApi, do arquivo conectaApi.js, 
// nessa propriedade conten um função assincrona que faz uma requisição do tipo get que retorna um objeto json

const lista = document.querySelector("[data-lista]") // selecionamos o elemento ul pelo atributo data
/**
 * O atributo data-* permite que você armazene informações que não têm um 
 * significado específico na marcação HTML padrão. Isso é útil para associar 
 * dados adicionais a elementos sem que eles sejam visíveis para o usuário.
 * 
 * obs.: eu testei o uso de um id="data-lista" e class="data-lista" e a aplicação funcionol normalmente, 
 * 
 * conclusão no nosso caso aqui o atributo data-lista esta sendo usado apenas para 
 * selecionar o elemento ul, onde adicionaremos elemnetos filhos para construir nossos
 * cards na listagens de videos, 
 * porem é recomendados em casos em que precisamos passar dados para o elemento html, dados que não se encaixão no emento html
 */


// criamos uma função para que vai contruir um card, essa função recebera 4 parametros, que são dados
// que serão usados na construção de cada card que ela construir
export default function constroiCard(descricao, imagem, titulo, url) {
    const video = document.createElement("li"); // criamos um elemento li, que sera o container de cada card
    video.className = "videos__item"; // atribuimos no li uma classe com nome videos__item, responsavel pela estilização do card

    /** na linha de baixo no innerHtml nos criamos a extrutura html do card que sera criado, e as 
     * variaveis ${} entre as chaves serão  recebidas  por parametros e os dados contidos nelas serão 
     * exibidas no card que esta extrutura html criara, 
     */
    video.innerHTML = ` <iframe width="100%" height="72%" src="${url}" 
    title="${titulo}" frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen></iframe>
<div class="descricao-video">
    <img src="${imagem}" alt="logo canal alura">
    <h3>${titulo}</h3>
    <p>${descricao}</p>
</div>`

    return video;// aqui retornamos um card pronto para ser exibido
}

// funçã oqeu implemeentara a listagem dos videos: aqui sera chamado a função que cria os cards 
// e aqui que sera passado para ela os argumentos que são os dados relevantes para ser exibidos nos cardis
async function listarVideo() {
    try {
        // chama a função listarVideos() importado do arquivo conectaApi.js: essa função retorna uma lista 
        //de  objeto json
        // os objetos json retornado pela função listarVideos() sera armazenado na const listApi
        // nesse objeto tem os dados que serão passados por parameetro para a função constroiCard()
        const listApi = await conectaApi.listarVideos();
        /**
         * com a  lista de objeto json {a,b,c,d} armazenado na listApi, vamos percorrer essa lista com um forEach
         * e em cada iteração vamos pegar os elemmentos da iteração em questão, 
         * chamaremos o elemento ul selecionado pelo atributo data-lista e armazenado na const lista
         * a partir desse elemento armazendado na const lista, chamaremos o metodo appendChild()
         * e através desse metodo passaremos como filho de ul(lista) o card criado pelo metodo constroiCard
         * e é exatamente aqui qeu os dados do objeto json são passados como parametro para o metodo constroi card
         * em cada iteração, é passado para o metodo um objeto json contido na lista
         * cada objeto contem os seguinte dados: descricao, imagem,titulo e url,  
         */
        listApi.forEach(element => {
            lista.appendChild(constroiCard(element.descricao, element.imagem, element.titulo, element.url));
        });
    } catch {
        // caso de algum problema no carregamento dos videos ou na requisiççao no bloco try, cai aqui no catch e exibe essa msg
        lista.innerHTML = `<h2 class="mensagem__titulo">Não foi possivel carregar  a lista de videos </h2>`
    }
}

listarVideo()



