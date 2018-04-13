<template>
    <div class="home">
        <h1>{{ titulo }}</h1>

        <div class="cadastrar" v-if="cep">
            <table class="table">
                <thead>
                    <tr>
                    <th scope="col">CEP</th>
                    <th scope="col">Bairro</th>
                    <th scope="col">Logradouro</th>
                    <th scope="col">Número</th>
                    <th scope="col">Complemento</th>
                    <th scope="col">UF</th>
                    <th></th>
                    <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>{{ cep }}</td>
                    <td>{{ bairro }}</td>
                    <td>{{ logradouro }}</td>
                    <td>{{ numero }}</td>
                    <td>{{ complemento }}</td>
                    <td>{{ uf }}</td>
                    <td><a class="btn btn-primary" v-bind:href="'/desafio-estante-virtual/#/editar'" role="button">Editar</a></td>
                    <td><a class="btn btn-danger" role="button" v-on:click="excluirEnreco" style="color: #fff;">Excluir</a></td>
                    </tr>
                </tbody>
                </table>
        </div>
        <div v-else>
            <a v-bind:href="'/desafio-estante-virtual/#/adicionar'"><button type="button" class="btn btn-primary btn-md">Adicionar um endereço</button></a>
        </div>
        <div class="endereco"></div>
    </div>
</template>
  

<script>
export default {
    data (){
        return {
            titulo: 'Endereço do usuário',
            cep: window.localStorage.getItem('CEP'), // Verificando se existe o CEP em LocalStorage
            bairro: window.localStorage.getItem('Bairro'),
            numero: window.localStorage.getItem('Número'),
            complemento: window.localStorage.getItem('Complemento'),
            logradouro: window.localStorage.getItem('Logradouro'),
            uf: window.localStorage.getItem('UF')
        }
    },

    methods: {
        excluirEnreco() {
            console.log('Deletou')
            localStorage.clear();
            history.go(0)
        }
    }
}
</script>

<style>

</style>
