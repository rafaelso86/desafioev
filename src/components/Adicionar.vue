<template>
  <div class="adicionar">
    <h1>{{ titulo }}</h1>

    <section>
      <form action="" method="post" id="formEndereco">

        <label for="input-default">CEP*:</label>
        <the-mask mask="#####-###" id="cep" name="cep" class="form-control" v-model="value" v-on:blur.native="pesquisacep" required />
        <a href="">Não sei meu CEP</a>

        <div class="dadosCep"></div>

        <div class="numero">
          <div class="my-1 field"></div>
        </div>

        <div class="complemento">
          <div class="my-1 field"></div>
        </div>

        <input type="hidden" name="logradouro" id="logradouro" value="">
        <input type="hidden" name="bairro" id="bairro" value="">
        <input type="submit" name="avancar" id="avancar" value="Avançar" class="btn btn-primary" disabled >

      </form>
    </section>
  </div>
</template>

<script>
import {TheMask} from 'vue-the-mask'
export default {
  data () {
    return {
      titulo: 'Adicionar Endereço',
      value: '',
      data: '',
      endereco: '',
      numero: '',
      complemento: ''
    }
  },

  methods: {
    pesquisacep (value) {
      // Nova variável "cep" somente com dígitos.
      var cep = this.value
      console.log(cep)

      // Limpa os dados da div que armazena as informações de endereço
      $('.dadosCep div').remove()
      $('.numero .field .linha').remove()
      $('.complemento .field .linha').remove()

      // Verifica se campo cep possui valor informado.
      if (cep !== '') {
        // Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/

        // Valida o formato do CEP.
        if (validacep.test(cep)) {
          $.getJSON('https://viacep.com.br/ws/' + cep + '/json', function (data) {
            if (('erro' in data)) {
              console.log('nada')
              $('.dadosCep').append('<div>CEP não encontrado</div>')

              $('.numero .field .linha').remove()
              $('.complemento .field .linha').remove()

              $('#logradouro').val('')
              $('#bairro').val('')
            }
            else {
              console.log(data)
              var cepCidade = data.cep
              var logradouro = data.logradouro
              var bairro = data.bairro
              var uf = data.uf

              // Exive as informações baseadas no CEP
              var endereco = $('.dadosCep').append('<div v-model="logradouro">' + logradouro + '</div><div v-model="bairro">' + bairro + ' - ' + uf + '</div>')

              // Monta os campos de numero e complemento
              var numero = $('.numero .field').append('<div class="linha"><label for="input-default">Número*:</label><input type="number" name="numero" id="numero" class="form-control" required></div>')
              var complemento = $('.complemento .field').append('<div class="linha"><label for="input-default">Complemento*:</label><textarea name="complemento" id="complemento" class="form-control" required></textarea></div>')
            
              $('#logradouro').val(logradouro)
              $('#bairro').val(bairro + '-' + uf)

              // Faz uma validação do formulário permitindo que o botão Avancar só seja liberado, após o preenchimento de todos os campos
              var btnAvancar = $('#avancar')
              $('#cep, #numero, #complemento').on('keyup', function () {
                if ($('#cep').val().length > 0 && $('#numero').val().length > 0 && $('#complemento').val().length > 0) {
                  btnAvancar.attr({disabled: false})
                } 
                else { 
                  btnAvancar.attr({disabled: true})
                }
              })

              // Previne o carregamento do formulário
              $('form').submit(function (e) {
                localStorage.setItem('CEP', cepCidade)
                localStorage.setItem('Logradouro', logradouro)
                localStorage.setItem('Bairro', bairro)
                localStorage.setItem('UF', uf)
                localStorage.setItem('Número', document.getElementById('numero').value)
                localStorage.setItem('Complemento', document.getElementById('complemento').value)
                
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .adicionar{
    max-width: 300px;
    margin: 0 auto;
    border: 1px solid #c6c6c6;
    border-radius: 5px;
    padding: 35px;
  }
  .dadosCep{padding: 10px 0;}
  #avancar{margin-top: 15px;}
</style>
