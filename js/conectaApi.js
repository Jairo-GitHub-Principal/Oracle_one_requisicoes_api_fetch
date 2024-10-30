// step 1 para uma requisição:
// criar uma função assincrona com async e await
async function listarVideos(){ // criamos uma  função assincrona criada, o async permite o uso do awayt dentro da função, 
   
    // criamos uma variavel onde vamos atribuir como valor o metodo fetch(), 
    //a quem passareemos uma url para quee seeja feita uma requisição http 
    //para o caminho espeeecificado na url, e o resultado sera armazenado na constante conection
    const conection= await fetch("http://localhost:3000/videos"); 

    const resDaRequestConvertidaEmJson = await conection.json(); 
    // convertemos resposnta em uma string json console.log(conection); 
    // a resposta chega no formato de um objeto response, ou object javascript
    
    console.log(resDaRequestConvertidaEmJson); // conveertido para json
    return resDaRequestConvertidaEmJson;

}


async function criarVideo(imagem,titulo,url,descricao){ // metodo para gravar dados no DB
   

    const conection = await fetch("http://localhost:3000/videos",{
        method:"POST", // define o tipo de requisição
        headers:{
            "Content-type":"application/json"}, // indica o tipo do conteudo que esta sendo enviado
                                                    // e application/json  que é o valor de content-type define que o corpo da requisição esta no formato JSON 


                                /**Esse trecho de código está preparando o corpo (body) 
                                da requisição HTTP, convertendo um objeto JavaScript em uma string JSON. 
                                Isso é necessário porque, ao enviar dados para um servidor, eles precisam 
                                ser serializados em um formato que possa ser interpretado adequadamente. */                                                    
        body:JSON.stringify({   imagem : imagem,
                                titulo : titulo,
                                url : url,
                                descricao :`${descricao} mil visualizações`
                                
                            }),
                            
                        });

                        // caso aja algum erro, para retornar um aviso do erro para o usuario
                        if(!conection.ok){
                            throw new Error("não foi possivel enviar o video")
                        }
                       
                        const resPostConvertidoEmJson = await conection.json(); // converte a resposta da requisiççao par json
                        
                        return resPostConvertidoEmJson; // retorna a reesposta da requisição
                    
                        /**
                         * obs.: apesar de o metodo em questão ser do tipo post, ou seja: ele esta enviando dados para o servidor ou DB.
                         * mais mesmo assim apesar do metodo post ser usado para enviar dados: 
                         * A resposta de uma requisição POST geralmente serve para informar se a operação foi bem-sucedida, 
                         * ou pode até mesmo enviar de volta dados adicionais.
                         * 
                         */
                    }



async function buscarVideosServer(termoDaBusca){
    /** a baixo temos uma requisição onde um parametro de busca é passado na requisição
     * pra ela pesquisar nos dados pelo conteudo relacionado ao parametro passado, o argumento do  parametro
     * pode conter um nome um id um titulo, algo que esteja relacionado com o conteudo buscado
     * se encontrado sera retornado e o usuario podera visualizar
     */
    const conection = await fetch(`http://localhost:3000/videos?q=${termoDaBusca}`) 
    const respEncontradoETraduzido = await conection.json();
    return respEncontradoETraduzido;

}                    



export const conectaApi = {listarVideos, criarVideo,buscarVideosServer}



