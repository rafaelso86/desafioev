<template>
  <div class="editar">
      <h1>{{ titulo }}</h1>

        <section>
            <form action="" method="post" id="formCep">
                <label for="input-default">CEP*:</label>
                <the-mask mask="#####-###" class="form-control" id="cep" name="cep" v-model="value" v-on:blur.native="pesquisacep" required />
                <a href="">Não sei meu CEP</a>

                <div class="retornoCep">
                    <label for="input-default">{{ logradouro }}</label><br/>
                    <label for="input-default">{{ bairro }}</label>
                </div>

                <div class="dadosCep"></div>

                <input type="hidden" name="uf" id="uf" value="">
                <input type="hidden" name="logradouro" id="logradouro" value="">
                <input type="hidden" name="bairro" id="bairro" value="">
        
                <input type="submit" name="avancar" id="avancar" value="Editar" class="btn btn-primary direto">
            </form>


            <form action="" method="post" id="formEndereco">
                <div class="endereco">
                    <label for="input-default">Número*:</label>
                    <input type="text" class="form-control" name="numero" id="numero" v-model="numero" required>
                </div>

                <div class="endereco">
                    <label for="input-default">Complemento*:</label>
                    <input type="text" class="form-control" name="complemento" id="complemento" v-model="complemento" required>
                </div>

                <input type="submit" name="avancar" id="avancar" value="Editar" v-on:click="numComplemento" class="btn btn-primary direto">
            </form>
        </section>
  </div>
</template>

<script>
    import {TheMask} from 'vue-the-mask'
    export default {
        data()  {
            return{
                titulo: 'Editar Endereço',
                value: window.localStorage.getItem('CEP').replace(/\D/g, ''),
                logradouro: window.localStorage.getItem('Logradouro'),
                bairro: window.localStorage.getItem('Bairro'),
                numero: window.localStorage.getItem('Número'),
                complemento: window.localStorage.getItem('Complemento'),
                uf: window.localStorage.getItem('UF')
            }
        },

        methods: {

        numComplemento (event) {
            event.preventDefault(event)

            localStorage.setItem('Número', document.getElementById("numero").value),
            localStorage.setItem('Complemento', document.getElementById("complemento").value)

            alert('Endereço alterado com sucesso')

            // Retorna para o inicio do painel
            window.location.href = '/desafio-estante-virtual/#/'
        },

        pesquisacep (value) {
        // Nova variável 'cep' somente com dígitos.
        var cep = this.value
        console.log(cep)

        // Limpa os dados da div que armazena as informações de endereço
        $('.dadosCep div').remove();
        
        // Verifica se campo cep possui valor informado.
        if (cep !== '') {
            // Expressão regular para validar o CEP.
            var validacep = /^[0-9]{8}$/

            // Valida o formato do CEP.
            if (validacep.test(cep)) {

            $.getJSON('https://viacep.com.br/ws/' + cep + '/json', function(data) {
                if (('erro' in data)) {
                    console.log('nada')
                    $('.retornoCep').remove()
                    $('.dadosCep').append('<div>CEP não encontrado</div>')

                    // Remove o botão
                    $('#avancar').css('display', 'none');
                }
                else{

                    // Exibe novamente obotão para salvar os dados
                    $('#avancar').css('display', 'block');

                    console.log(data)
                    var cepCidade = data.cep
                    var logradouro = data.logradouro
                    var bairro = data.bairro
                    var uf = data.uf

                    $('.retornoCep').remove();

                    // Exibe as informações baseadas no CEP
                    var endereco = $('.dadosCep').append('<div v-model="logradouro">' + logradouro + '</div><div v-model="bairro">' + bairro + ' - ' + uf + '</div>')

                    // Previne o carregamento do formulário
                    $('form').submit(function (e) {
                        localStorage.setItem('CEP', cepCidade)
                        localStorage.setItem('Logradouro', logradouro)
                        localStorage.setItem('Bairro', bairro)
                        localStorage.setItem('UF', uf)

                        alert('CEP alterado com sucesso')
                        
                        e.preventDefault()
                        
                        // Retorna para o inicio do painel
                        window.location.href = '/desafio-estante-virtual/#/'
                    })
                }
            })
            }

            else {
                // cep é inválido.
                $('.dadosCep').append('<div>Formato de CEP inválido</div>')

                // Remove o botão
                    $('#avancar').css('display', 'none')
            }
        }
        else {
            // cep sem valor, limpa formulário.
            console.log('Nada encontrado')
        }
        }
    },

    components: {TheMask}
}
</script>

<style>
    .container{
        margin: 25px auto 25px;
    }
    .container-footer{
        margin: 0;
    }
    #avancar{
        display: block;
    }
    .editar{
        max-width: 300px;
        margin: 0 auto;
        border: 1px solid #c6c6c6;
        border-radius: 5px;
        padding: 20px;
    }
    #avancar{margin-top: 15px;}
    .dadosCep{padding: 10px 0;}
    .retornoCep label{margin-bottom: 0;}
    #formCep{margin-bottom: 20px;}
</style>
