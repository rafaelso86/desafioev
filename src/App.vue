<template>
  <div id="app">
    <!-- Topo -->
    <header>
      <b-navbar toggleable="md" type="dark" variant="info">

        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

        <b-navbar-brand href="/desafio-estante-virtual/#/">Painel Endereço</b-navbar-brand>

        <b-collapse is-nav id="nav_collapse">

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">

            <b-nav-item href="/desafio-estante-virtual/#/">Home</b-nav-item>

          </b-navbar-nav>

        </b-collapse>
      </b-navbar>
    </header>

    <!-- Conteúdo -->
    <b-container class="container">
        <b-row>
            <b-col>
              <router-view/>
            </b-col>
        </b-row>
    </b-container>

    <!-- Rodapé -->
    <footer>
      <b-container class="container-footer">
          <b-row>
              <b-col>
                <span>Desenvolvido por: Rafael da Silva Oliveira | E-mail: <a href="mailto:rafaelso86@gmail.com">rafaelso86@gmail.com</a></span>
              </b-col>
          </b-row>
      </b-container>
    </footer>

  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
}
header{
  display: block;
  background: #575757;
}
.bg-info{
  max-width: 1140px;
  margin: 0 auto;
  background-color: #575757 !important;
}
h1{
  font-size: 25px;
}
.container{
  margin: 25px auto 25px;
}
footer{
  text-align: center;
  color: #fff;
  background: #575757;
  padding: 15px 0;
}
.container-footer{
  margin: 0 auto;
}
#cep{width: 108px;}
#numero{width: 100px;}
.btn-danger{color: #fff;}
footer{
  position:fixed;
  bottom: 0;
  width: 100%;
}
footer a{
  text-decoration: none;
  font-weight: bold;
  color: #fff;
}
footer a:hover{
  color: #f5f5f5;
  text-decoration: none;
}
</style>
