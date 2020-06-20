/*
  tweaked from Alexey Schebelev's script
  https://github.com/AlexxNB/highlightjs-svelte/blob/master/src/svelte.js
*/

const IDENT_RE = "[A-Za-z$_][0-9A-Za-z$_]*";

function hljsDefineSvelte(hljs) {
  return {
    subLanguage: "xml",
    contains: [
      hljs.COMMENT("<!--", "-->", {
        relevance: 10,
      }),
      {
        begin: /^(\s*)(<script(\s*context="module")?>)/gm,
        end: /^(\s*)(<\/script>)/gm,
        subLanguage: "javascript",
        excludeBegin: true,
        excludeEnd: true,
        contains: [
          {
            begin: /^(\s*)(\$:)/m,
            end: /\s/,
            excludeEnd: true,
            className: "keyword",
            relevance: 0,
          },
          {
            begin: /^(\s*)(export)*(\s)(let|const|var|function|\$:)(\s)/gm,
            end: /\s/,
            className: "variable",
            excludeBegin: true,
            excludeEnd: true,
            relevance: 10,
          },
          // {
          //   begin: /(\s)(\$)(\w)/gm,
          //   end: /\s/gm,
          //   className: "variable",
          //   // excludeBegin: true,
          //   // excludeEnd: true,
          //   relevance: 10,
          // },
          {
            begin: /(scaleLinear|scaleSqrt|colorScale|extent)/gm,
            // end: /\s/,
            className: "d3",
            excludeEnd: true,
            relevance: 10,
          },
          {
            begin: /(let|const)(\s)+.+(\s\=\s)(\()*/gm,
            end: /(\s\=\>)/,
            className: "d3",
            // excludeBegin: true,
            // excludeEnd: true,
            // relevance: 10,
          },
          {
            begin: /(d3\-)/gm,
            end: /\"/,
            className: "d3",
            excludeEnd: true,
            // relevance: 10,
          },
          {
            begin: /^(\s*)(\.)(domain|range|interpolate)/gm,
            end: /\(/,
            className: "d3",
            // excludeBegin: true,
            excludeEnd: true,
            relevance: 10,
          },
          {
            begin: /^(\s*)(import)(\s)(\{*)/gm,
            end: /(\})*(\s)(from)/,
            className: "variable",
            excludeBegin: true,
            excludeEnd: true,
          },
        ],
      },
      {
        begin: /^(\s*)(<style.*>)/gm,
        end: /^(\s*)(<\/style>)/gm,
        subLanguage: "css",
        excludeBegin: true,
        excludeEnd: true,
      },
      {
        begin: /\{/gm,
        end: /\}/gm,
        subLanguage: "javascript",
        contains: [
          {
            begin: /[\{]/,
            end: /[\}]/,
            skip: true,
          },
          {
            begin: /([#:\/@])(if|else|each|await|then|catch|debug|html)/gm,
            className: "keyword",
            relevance: 10,
          },
        ],
      },
    ],
  };
}

export default hljsDefineSvelte;
