<template>
  <div class="content">
    <h1>swagger-markdown UI</h1>
    <p>
      来自于
      <a
        href="https://github.com/syroegkin/swagger-markdown"
        target="_blank"
        rel="noopener"
        >swagger-markdown</a
      >
      - swagger yaml 转化为 markdown.
    </p>
    <div style="display: flex;justify-content: center;">
      <div style=" width: 50%;margin: 10px">
        <div class="a">
          <h3>接口链接:</h3>
          <input style="width: 70%;height: 2rem;border: 1px solid #999; border-radius: 5px" type="text" v-model="inputURL" />
          <button v-on:click="handleSubmitURL" style="height: 2rem;border: 1px solid #999; border-radius: 5px; margin-left: 10px">转化！</button>
        </div>
        <h1 style="color: red;text-align: center">或者</h1>
        <div class="b">
          <h3>这里输入Swagger Yaml:</h3>
          <textarea id="yaml" rows="16" v-model="inputYaml"> </textarea>
          <button v-on:click="handleSubmit" class="Conversion">转化！</button>
        </div>
      </div>
      <div style=" width: 50%;margin: 10px">
        <h3>这里输出markdown:</h3>
        <textarea
          id="markdown"
          rows="16"
          v-model="outputMarkdown"
          readonly
          style="height: 400px;"
        >
        </textarea>
      </div>
    </div>
  </div>
</template>

<script>
const yaml = require("js-yaml");
const transformInfo = require("../swagger-markdown/transformers/info");
const transformPaths = require("../swagger-markdown/transformers/paths");
const transformSecurityDefinitions = require("../swagger-markdown/transformers/securityDefinitions");
const transformExternalDocs = require("../swagger-markdown/transformers/externalDocs");
const transformComponents = require("../swagger-markdown/transformers/components");
export default {
  name: "HelloWorld",
  data: function () {
    return {
      inputURL: "http://localhost:8080/v3/api-docs",
      inputYaml: "",
      outputMarkdown: "",
    };
  },
  methods: {
    handleSubmitURL: function () {
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      fetch(this.inputURL, requestOptions)
        .then((response) => response.text())
        .then((result) => {
          this.inputYaml = result;
          this.handleSubmit();
        })
        .catch((error) => (this.outputMarkdown = error));
    },
    handleSubmit: function () {
      try {
        const inputDoc = yaml.safeLoad(this.inputYaml);
        const document = [];
        if ("info" in inputDoc) {
          document.push(transformInfo(inputDoc.info));
        }

        if ("externalDocs" in inputDoc) {
          document.push(transformExternalDocs(inputDoc.externalDocs));
        }

        // Security definitions
        if ("securityDefinitions" in inputDoc) {
          document.push(
            transformSecurityDefinitions(inputDoc.securityDefinitions)
          );
        }

        // Process Paths
        if ("paths" in inputDoc) {
          document.push(transformPaths(inputDoc.paths));
        }
        // Models (definitions)

        if ("components" in inputDoc) {
          document.push(transformComponents(inputDoc.components));
        }

        this.outputMarkdown = document.join("\n");
      } catch (e) {
        this.outputMarkdown = e;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 20px 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.Conversion{
  width: 200px;
  height: 50px;
  border: 1px solid #999;
  border-radius: 20px;
}
textarea{
  resize: none;
  width: 80%;
  height: 200px;
  border-radius: 10px;
}
</style>
