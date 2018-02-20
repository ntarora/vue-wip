<template>
  <el-container id="app">
    <el-header>
      <span style="float: left"> Stock Cards </span>
      <el-button class="add-button" @click="dialogVisible = true"> Add Card </el-button>
    </el-header>
    <el-dialog
        title="Add Card"
        :visible.sync="dialogVisible"
        width="50%">
        <el-input v-model="inputSymbol" placeholder='enter symbol'/>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false; handleAdd()">Confirm</el-button>
          <el-button @click="dialogVisible = false">Cancel</el-button>
        </span>
      </el-dialog>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      dialogVisible: false,
      inputSymbol: '',
    };
  },
  methods: {
    handleAdd() {
      if (this.inputSymbol.length > 0) {
        const event = new CustomEvent('add-card', { detail: this.inputSymbol });
        window.dispatchEvent(event);
        this.inputSymbol = '';
      }
    },
  },

};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 20px;
}
.el-body {
  background-color: #E0E0E0;
}
.el-header {
    background-color: #7cb5ec;
    color: #333;
    line-height: 60px;
    text-align: center;
    font-size: 20px;
    margin-bottom: 40px;
    justify-contents: center;
}

.dialog-footer {
  margin-top: 10px;
}

.add-button {
  float: right;
  margin: 10px;
}

</style>
