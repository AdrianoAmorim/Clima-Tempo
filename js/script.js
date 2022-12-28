//Pegando os Elementos da DOM
const inpLocalizacao = document.getElementById('inpLocalizacao');
const boxResult = document.getElementById('boxResult');
const nomeCidade = document.querySelector('#titleResult label');
const imgPais = document.querySelector('#titleResult img');
const temp = document.querySelector('#boxTemperatura label span');
const imgTemp = document.querySelector('#boxTemperatura img');
const descricaoTemp = document.querySelector('#boxTemperatura picture label');
const umidade = document.querySelector('#boxInfoRestantes #umidade label');
const imgUmidade = document.querySelector('#boxInfoRestantes #umidade img');
const velocidade = document.querySelector('#boxInfoRestantes #velocidade label');
const imgVelocidade = document.querySelector('#boxTemperatura #velocidade img');
const btnBuscar = document.getElementById('btnBuscar');
const boxAvisos = document.getElementById('boxAvisos');
const lblAvisos = document.querySelector("#boxAvisos label")
const loader = document.getElementById("loader");


//URLS da API
const urlClima = "https://api.openweathermap.org/data/2.5/weather?q="

//FUNÇÕES
//Resetar os campos
const resetCampos = () => {
    boxAvisos.classList.remove("showAnimation");
    boxResult.classList.remove("showAnimation");
    boxAvisos.classList.add("hidden");
    boxResult.classList.add("hidden");
    btnBuscar.classList.remove("hidden");
}

//FUNÇÃO PARA LIBERAR A ENTRADA NO APP QUANDO TUDO TIVER SIDO CARREGADO
const loading = () => {
    document.getElementById("background").classList.remove("hidden")
    document.getElementById("background").classList.add("fadeIn")
}
//faz a requisição e pega o clima escolhido e chama funcao para setar os dados
const getClima = async (cidade) => {
    loader.classList.remove("hidden");
    btnBuscar.classList.add("hidden")
    const url = `${urlClima}+${cidade}+&units=metric&lang=pt_br&appid=a44fd137625e071dc722ea150b72725b`
    const data = await fetch(url)
        .then(res => {
            //testa se a requisicao retorno tudo certo e retorna o resultado
            if (res.ok) {
                return res.json()
            } else {
                //senao ela gera um erro e devolve p catch o status do erro q veio da requisicao
                throw Error(res.statusText)
            }
        }).catch(err => {
            console.log("Erro ao Conectar com a API!- " + err)
        })

    //testa se veio os dados corretamente ou não
    if (data) {
        setValores(data);
    } else {
        loader.classList.add("hidden");
        lblAvisos.innerText = "OPS! Cidade Não Encontrada !"
        boxAvisos.classList.remove("hidden");
        boxAvisos.classList.add("showAnimation")
        btnBuscar.classList.remove("hidden");

    }

}
//SETA OS VALORES NOS COMPONENTES
const setValores = async (data) => {

    imgPais.setAttribute("src", `https://countryflagsapi.com/png/${data.sys.country}`);
    imgTemp.setAttribute("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
    nomeCidade.innerText = data.name + " - " + data.sys.country;
    temp.innerText = parseInt(data.main.temp);
    descricaoTemp.innerText = data.weather[0].description.toUpperCase();
    umidade.innerText = data.main.humidity + "%";
    velocidade.innerText = data.wind.speed + " Km/h";
    boxResult.classList.remove("hidden");
    boxResult.classList.add("showAnimation");
    btnBuscar.classList.remove("hidden");
    loader.classList.add("hidden");

}

//EVENTOS
//Funcao para Buscar o clima no clique no button
btnBuscar.addEventListener('click', () => {
    resetCampos();
    if (inpLocalizacao.value.length == 0) {
        lblAvisos.innerText = "Campo vazio - Digite o nome da Cidade !"
        boxAvisos.classList.remove("hidden");
        boxAvisos.classList.add("showAnimation");
    } else {
        const cidade = inpLocalizacao.value.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        getClima(cidade);
    }

})
//Funcao para buscar o clima quando apertar o ENTER
inpLocalizacao.addEventListener("keyup", (e) => {
    if (e.code === 'Enter') {
           resetCampos();
        if (inpLocalizacao.value.length == 0) {
            lblAvisos.innerText = "Campo vazio - Digite o nome da Cidade !"
            boxAvisos.classList.remove("hidden");
            boxAvisos.classList.add("showAnimation");
        } else {
            const cidade = inpLocalizacao.value.normalize('NFD').replace(/[\u0300-\u036f]/g, "");;
            getClima(cidade);
        }
    }
})
//funcao para quando o input receber o foco resetar todos os componentes
inpLocalizacao.addEventListener('focus', () => {
    resetCampos();
})
