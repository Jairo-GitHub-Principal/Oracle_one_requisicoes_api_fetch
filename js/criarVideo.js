import { conectaApi } from "./conectaApi.js";

const form = document.querySelector("[data-formulario]"); // seleciono o formulario


async function criarVideos(evento){
       
    evento.preventDefault();/** A função preventDefault() em JavaScript é um método que faz parte do objeto Event. Ele é usado para impedir que a ação padrão do evento ocorra. Isso é especialmente útil quando você deseja evitar comportamentos padrão que o navegador normalmente executaria em resposta a um evento, como o envio de um formulário ou a navegação para um link. */
    
        const url = document.querySelector("[data-url]").value;
        const titulo = document.querySelector("[data-titulo]").value;
        const imagem = document.querySelector("[data-imagem]").value;

       
        
    

    /** a descrição ela não esta sendo enviada pelo formulario nos a criaremos aqui */
     let random = Math.random()*10
     const descricao  = Math.floor( (Math.random()*10)*random).toString();

     try{
    /**chamar a função que vai enviar os dados para ser gravados do DB  */
        await conectaApi.criarVideo(imagem,titulo,url,descricao);

     // caso a requisição post  tenha sucesso, redicionaremos para a pgiana de feedback positivo da requisiççao post
     window.location.href = "../pages/envio-concluido.html";
     }catch(e){ // captura a msg de erro feito no if(!conection.ok) do metodo criarVideo em conectaApi 
        alert(e)
     }
}


/**abaixo temos o ouvinte, que quando acontecer o evento submit, ele captura o evento
 * passa o objeto do evento como argumento da função criarvideos
 */
form.addEventListener("submit",evento => criarVideos(evento)); 
