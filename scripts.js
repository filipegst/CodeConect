
const uploadbtn = document.getElementById("upload-btn")
const  inputUpload = document.getElementById("image-upload")


uploadbtn.addEventListener("click", () => inputUpload.click())

function lerConteudoDoArquivo(arquivo){
    return new Promise((resolve, reject) => {
        const leitor = new FileReader()
        leitor.onload = () => resolve ({url: leitor.result, nome: arquivo.name})
    
        leitor.onerror = () => reject(`Erro na leitura do arquivo ${arquivo.name}`)
    
        leitor.readAsDataURL(arquivo)
    } )
}

const imagemPrincipal = document.querySelector(".main-imagem")
const nomeDaImagem = document.querySelector("#documento-nome")  //Teste com id no p 

inputUpload.addEventListener("change", async (evento)=> {
    const arquivo = evento.target.files[0];

    if (arquivo){
        try{
            const ConteudoDoArquivo = await lerConteudoDoArquivo(arquivo)
            imagemPrincipal.src = ConteudoDoArquivo.url
            nomeDaImagem.textContent = ConteudoDoArquivo.nome
        } catch (erro){
            console.error("Erro na leitura do arquivo")
        }
    }
})

const inputTags = document.getElementById ("input-tags")
const listaTags = document.getElementById ("lista-tags")


listaTags.addEventListener("click", (evento) =>{
    if (evento.target.classList.contains("remove-tag")){
        const tagRemovivel = evento.target.parentElement;
        listaTags.removeChild(tagRemovivel)
    }
} )

const tagsDisponiveis = ["front-end", "programação", "data science", "full-stack" ,"HTML", "CSS", "javaScript", "Java", "C++" , "back-end", "IA", "mobile", "kotlin", "phyton", "ruby"]


async function  verificaTagsDisponiveis(tagTexto) {
    return new Promise((resolve) => {
        setTimeout(()=>{
            resolve(tagsDisponiveis.includes(tagTexto))
        },1000)
    })
    
}

inputTags.addEventListener("keypress", async (evento) =>{
    if (evento.key === "Enter"){
        evento.preventDefault();
        const tagTexto = inputTags.value.trim()
        if(tagTexto !== ""){
            try{
            const tagExiste = await verificaTagsDisponiveis(tagTexto)
            if(tagExiste){
            const tagNova = document.createElement("li");
            tagNova.innerHTML = `<p>${tagTexto}</p> <img src="/img/close-black.svg" class="remove-tag">`
            listaTags.appendChild(tagNova)
            inputTags.value = ""
            }else{
                alert("Tag não encontrada.")
            }
            } catch(error){
                console.error("Erro ao verificar a existecia da tag")
                alert("Erro ao verificar a existecia da tag. Verifique o console")
            }
        }

    }
})

const botaoPublicar = document.querySelector(".botao-publicar")



async function publicarProjeto(nomeDoProjeto,descricaoDoProjeto,tagsProjeto) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const deuCerto =Math.random() > 0.5
            
            if (deuCerto){
                resolve ("Projeto publicado com sucesso")
            } else{
                reject("Erro ao publicar o projeto")
            }
        },2000)
    })
}
    
    botaoPublicar.addEventListener("click", async(evento) =>{
        evento.preventDefault();

        const nomeDoProjeto = document.getElementById("nome").value
        const descricaoDoProjeto = document.getElementById("descricao").value
        const tagsProjeto = Array.from(listaTags.querySelectorAll("p")).map((tag) =>tag.textContent);
    
        try{
            const resultado = await publicarProjeto(nomeDoProjeto,descricaoDoProjeto,tagsProjeto)
            console.log(resultado)
            alert("Projeto enviado com sucesso")
        } catch (error){
            console.log("Erro ao enviar projeto:", error)
            alert ("Erro ao publicar o projeto")
        }
       
    })


    const botaoDescartar = document.querySelector(".botao-descartar")

    botaoDescartar.addEventListener("click", (evento) => {evento.preventDefault()
        const formulario = document.querySelector("form")
        formulario.reset()

        imagemPrincipal.src = "/img/imagem1.png"
        nomeDaImagem.textContent = "image_projeto.png"
        listaTags.innerHTML = ""

    })