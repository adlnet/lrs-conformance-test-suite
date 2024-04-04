module.exports = {
  "1.0.3": {
    "conformanceTestCount": 1365,
    "tests": {
      "text": "",
      "children": [
        {
          "text": "Formatting Requirements",
          "children": [
            {
              "text": "A Statement contains an \"actor\" property",
              "children": [
                {
                  "text": "statement \"actor\" missing",
                  "children": []
                }
              ]
            },
            {
              "text": "A Statement contains a \"verb\" property",
              "children": [
                {
                  "text": "statement \"verb\" missing",
                  "children": []
                }
              ]
            },
            {
              "text": "A Statement contains an \"object\" property",
              "children": [
                {
                  "text": "statement \"object\" missing",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS rejects with error code 400 Bad Request any Statement having a property whose value is set to \"null\", except in an \"extensions\" property",
              "children": [
                {
                  "text": "statement actor should fail on \"null\"",
                  "children": []
                },
                {
                  "text": "statement verb should fail on \"null\"",
                  "children": []
                },
                {
                  "text": "statement context should fail on \"null\"",
                  "children": []
                },
                {
                  "text": "statement object should fail on \"null\"",
                  "children": []
                },
                {
                  "text": "statement activity extensions can be empty",
                  "children": []
                },
                {
                  "text": "statement result extensions can be empty",
                  "children": []
                },
                {
                  "text": "statement context extensions can be empty",
                  "children": []
                },
                {
                  "text": "statement substatement activity extensions can be empty",
                  "children": []
                },
                {
                  "text": "statement substatement result extensions can be empty",
                  "children": []
                },
                {
                  "text": "statement substatement context extensions can be empty",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS rejects with error code 400 Bad Request a Statement which uses the wrong data type",
              "children": [
                {
                  "text": "with strings where numbers are required",
                  "children": []
                },
                {
                  "text": "even if those strings contain numbers",
                  "children": []
                },
                {
                  "text": "with strings where booleans are required",
                  "children": []
                },
                {
                  "text": "even if those strings contain booleans",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS rejects with error code 400 Bad Request a Statement which uses any non-format-following key or value, including the empty string, where a string with a particular format, such as mailto IRI, UUID, or IRI, is required.",
              "children": [
                {
                  "text": "statement \"id\" invalid numeric",
                  "children": []
                },
                {
                  "text": "statement \"id\" invalid object",
                  "children": []
                },
                {
                  "text": "statement \"id\" invalid UUID with too many digits",
                  "children": []
                },
                {
                  "text": "statement \"id\" invalid UUID with non A-F",
                  "children": []
                },
                {
                  "text": "statement actor \"agent\" account \"name\" property is string",
                  "children": []
                },
                {
                  "text": "statement actor \"group\" account \"name\" property is string",
                  "children": []
                },
                {
                  "text": "statement authority \"agent\" account \"name\" property is string",
                  "children": []
                },
                {
                  "text": "statement authority \"group\" account \"name\" property is string",
                  "children": []
                },
                {
                  "text": "statement context instructor \"agent\" account \"name\" property is string",
                  "children": []
                },
                {
                  "text": "statement context instructor \"group\" account \"name\" property is string",
                  "children": []
                },
                {
                  "text": "statement context team \"group\" account \"name\" property is string",
                  "children": []
                },
                {
                  "text": "statement substatement as \"agent\" account \"name\" property is string",
                  "children": []
                },
                {
                  "text": "statement substatement as \"group\" account \"name\" property is string",
                  "children": []
                },
                {
                  "text": "statement substatement\"s \"agent\" account \"name\" property is string",
                  "children": []
                },
                {
                  "text": "statement substatement\"s \"group\" account \"name\" property is string",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor \"agent\" account \"name\" property is string",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor \"group\" account \"name\" property is string",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context team \"group\" account \"name\" property is string",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS rejects with error code 400 Bad Request a Statement where the case of a key does not match the case specified in this specification.",
              "children": [
                {
                  "text": "should fail when not using \"id\"",
                  "children": []
                },
                {
                  "text": "should fail when not using \"actor\"",
                  "children": []
                },
                {
                  "text": "should fail when not using \"verb\"",
                  "children": []
                },
                {
                  "text": "should fail when not using \"object\"",
                  "children": []
                },
                {
                  "text": "should fail when not using \"result\"",
                  "children": []
                },
                {
                  "text": "should fail when not using \"context\"",
                  "children": []
                },
                {
                  "text": "should fail when not using \"timestamp\"",
                  "children": []
                },
                {
                  "text": "should fail when not using \"stored\"",
                  "children": []
                },
                {
                  "text": "should fail when not using \"authority\"",
                  "children": []
                },
                {
                  "text": "should fail when not using \"version\"",
                  "children": []
                },
                {
                  "text": "should fail when not using \"attachments\"",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS rejects with error code 400 Bad Request a Statement where the case of a value restricted to enumerated values does not match an enumerated value given in this specification exactly.",
              "children": [
                {
                  "text": "when interactionType is wrong case (\"true-faLse\")",
                  "children": []
                },
                {
                  "text": "when interactionType is wrong case (\"choiCe\")",
                  "children": []
                },
                {
                  "text": "when interactionType is wrong case (\"fill-iN\")",
                  "children": []
                },
                {
                  "text": "when interactionType is wrong case (\"long-fiLl-in\")",
                  "children": []
                },
                {
                  "text": "when interactionType is wrong case (\"matchIng\")",
                  "children": []
                },
                {
                  "text": "when interactionType is wrong case (\"perfOrmance\")",
                  "children": []
                },
                {
                  "text": "when interactionType is wrong case (\"seqUencing\")",
                  "children": []
                },
                {
                  "text": "when interactionType is wrong case (\"liKert\")",
                  "children": []
                },
                {
                  "text": "when interactionType is wrong case (\"nUmeric\")",
                  "children": []
                },
                {
                  "text": "when interactionType is wrong case (\"Other\")",
                  "children": []
                }
              ]
            },
            {
              "text": "The LRS rejects with error code 400 Bad Request a token with does not validate as matching the RFC 5646 standard in the sequence of token lengths for language map keys.",
              "children": [
                {
                  "text": "statement verb \"display\" should pass given de two letter language code only",
                  "children": []
                },
                {
                  "text": "statement verb \"display\" should fail given invalid language code",
                  "children": []
                },
                {
                  "text": "statement object \"name\" should pass given de-DE language-region code",
                  "children": []
                },
                {
                  "text": "statement object \"name\" should fail given invalid language code",
                  "children": []
                },
                {
                  "text": "statement object \"description\" should pass given zh-Hant language-script code",
                  "children": []
                },
                {
                  "text": "statement object \"description\" should fail given invalid language code",
                  "children": []
                },
                {
                  "text": "interaction components' description should pass given sr-Latn-RS language-script-region code",
                  "children": []
                },
                {
                  "text": "context.language should pass given three letter cmn language code",
                  "children": []
                },
                {
                  "text": "context.language should fail given invalid language code",
                  "children": []
                },
                {
                  "text": "statement attachment \"display\" should pass given es two letter language code only",
                  "children": []
                },
                {
                  "text": "statement attachment \"display\" should fail given invalid language code",
                  "children": []
                },
                {
                  "text": "statement attachment \"description\" should pass given es-MX language-UN region code",
                  "children": []
                },
                {
                  "text": "statement attachment \"description\" should fail given es-MX invalid language code",
                  "children": []
                },
                {
                  "text": "statement substatement verb \"display\" should pass given sr-Cyrl language-script code",
                  "children": []
                },
                {
                  "text": "statement substatement verb \"display\" should fail given invalid language code",
                  "children": []
                },
                {
                  "text": "statement substatement activity \"name\" should pass given zh-Hans-CN language-script-region code",
                  "children": []
                },
                {
                  "text": "statement substatement activity \"name\" should fail given zh-z-aaa-z-bbb-c-ccc invalid (two extensions with same single-letter prefix) language code",
                  "children": []
                },
                {
                  "text": "statement substatement activity \"description\" should pass given ase three letter language code",
                  "children": []
                },
                {
                  "text": "statement substatement activity \"description\" should fail given invalid language code",
                  "children": []
                },
                {
                  "text": "substatement interaction components' description should pass given ja two letter language code only",
                  "children": []
                },
                {
                  "text": "substatement context.language should pass given two letter fr-CA language-region code",
                  "children": []
                },
                {
                  "text": "substatement context.language should fail given invalid language code",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS stores 32-bit floating point numbers with at least the precision of IEEE 754",
              "children": [
                {
                  "text": "should pass and keep precision",
                  "children": []
                }
              ]
            },
            {
              "text": "The LRS rejects with error code 400 Bad Request parameter values which do not validate to the same standards required for values of the same types in Statements",
              "children": [
                {
                  "text": "should reject when statementId value is invalid",
                  "children": []
                },
                {
                  "text": "should reject when statementId value is invalid",
                  "children": []
                },
                {
                  "text": "should reject when statementId value is invalid",
                  "children": []
                },
                {
                  "text": "should reject when statementId value is invalid",
                  "children": []
                },
                {
                  "text": "should reject when statementId value is invalid",
                  "children": []
                },
                {
                  "text": "should reject when statementId value is invalid",
                  "children": []
                }
              ]
            },
            {
              "text": "All Objects are well-created JSON Objects",
              "children": [
                {
                  "text": "An LRS rejects a not well-created JSON Object",
                  "children": []
                },
                {
                  "text": "Statements Verify Templates",
                  "children": [
                    {
                      "text": "should pass statement template",
                      "children": []
                    }
                  ]
                },
                {
                  "text": "Agents Verify Templates",
                  "children": [
                    {
                      "text": "should pass statement actor template",
                      "children": []
                    },
                    {
                      "text": "should pass statement authority template",
                      "children": []
                    },
                    {
                      "text": "should pass statement context instructor template",
                      "children": []
                    },
                    {
                      "text": "should pass statement substatement as agent template",
                      "children": []
                    },
                    {
                      "text": "should pass statement substatement\"s agent template",
                      "children": []
                    },
                    {
                      "text": "should pass statement substatement\"s context instructor template",
                      "children": []
                    }
                  ]
                },
                {
                  "text": "Groups Verify Templates",
                  "children": [
                    {
                      "text": "should pass statement actor template",
                      "children": []
                    },
                    {
                      "text": "should pass statement authority template",
                      "children": []
                    },
                    {
                      "text": "should pass statement context instructor template",
                      "children": []
                    },
                    {
                      "text": "should pass statement context team template",
                      "children": []
                    },
                    {
                      "text": "should pass statement substatement as group template",
                      "children": []
                    },
                    {
                      "text": "should pass statement substatement\"s group template",
                      "children": []
                    },
                    {
                      "text": "should pass statement substatement\"s context instructor template",
                      "children": []
                    },
                    {
                      "text": "should pass statement substatement\"s context team template",
                      "children": []
                    }
                  ]
                },
                {
                  "text": "A Group is defined by \"objectType\" of an \"actor\" property or \"object\" property with value \"Group\"",
                  "children": [
                    {
                      "text": "statement actor \"objectType\" accepts \"Group\"",
                      "children": []
                    },
                    {
                      "text": "statement authority \"objectType\" accepts \"Group\"",
                      "children": []
                    },
                    {
                      "text": "statement context instructor \"objectType\" accepts \"Group\"",
                      "children": []
                    },
                    {
                      "text": "statement context team \"objectType\" accepts \"Group\"",
                      "children": []
                    },
                    {
                      "text": "statement substatement as group \"objectType\" accepts \"Group\"",
                      "children": []
                    },
                    {
                      "text": "statement substatement\"s group \"objectType\" accepts \"Group\"",
                      "children": []
                    },
                    {
                      "text": "statement substatement\"s context instructor \"objectType\" accepts \"Group\"",
                      "children": []
                    },
                    {
                      "text": "statement substatement\"s context team \"objectType\" accepts \"Group\"",
                      "children": []
                    }
                  ]
                },
                {
                  "text": "An Anonymous Group is defined by \"objectType\" of an \"actor\" or \"object\" with value \"Group\" and by none of \"mbox\", \"mbox_sha1sum\", \"openid\", or \"account\" being used",
                  "children": [
                    {
                      "text": "statement actor does not require functional identifier",
                      "children": []
                    },
                    {
                      "text": "statement authority does not require functional identifier",
                      "children": []
                    },
                    {
                      "text": "statement context instructor does not require functional identifier",
                      "children": []
                    },
                    {
                      "text": "statement context team does not require functional identifier",
                      "children": []
                    },
                    {
                      "text": "statement substatement as group does not require functional identifier",
                      "children": []
                    },
                    {
                      "text": "statement substatement\"s group does not require functional identifier",
                      "children": []
                    },
                    {
                      "text": "statement substatement\"s context instructor does not require functional identifier",
                      "children": []
                    },
                    {
                      "text": "statement substatement\"s context team does not require functional identifier",
                      "children": []
                    }
                  ]
                },
                {
                  "text": "Verbs Verify Templates",
                  "children": [
                    {
                      "text": "should pass statement verb template",
                      "children": []
                    },
                    {
                      "text": "should pass substatement verb template",
                      "children": []
                    }
                  ]
                },
                {
                  "text": "Objects Verify Templates",
                  "children": [
                    {
                      "text": "should pass statement activity template",
                      "children": []
                    },
                    {
                      "text": "should pass statement substatement activity template",
                      "children": []
                    },
                    {
                      "text": "should pass statement agent template",
                      "children": []
                    },
                    {
                      "text": "should pass statement substatement agent template",
                      "children": []
                    },
                    {
                      "text": "should pass statement group template",
                      "children": []
                    },
                    {
                      "text": "should pass statement substatement group template",
                      "children": []
                    },
                    {
                      "text": "should pass statement StatementRef template",
                      "children": []
                    },
                    {
                      "text": "should pass statement substatement StatementRef template",
                      "children": []
                    },
                    {
                      "text": "should pass statement SubStatement template",
                      "children": []
                    }
                  ]
                },
                {
                  "text": "Activities Verify Templates",
                  "children": [
                    {
                      "text": "should pass statement activity default template",
                      "children": []
                    },
                    {
                      "text": "should pass statement substatement activity default template",
                      "children": []
                    },
                    {
                      "text": "should pass statement activity choice template",
                      "children": []
                    },
                    {
                      "text": "should pass statement activity fill-in template",
                      "children": []
                    },
                    {
                      "text": "should pass statement activity numeric template",
                      "children": []
                    },
                    {
                      "text": "should pass statement activity likert template",
                      "children": []
                    },
                    {
                      "text": "should pass statement activity long-fill-in template",
                      "children": []
                    },
                    {
                      "text": "should pass statement activity matching template",
                      "children": []
                    },
                    {
                      "text": "should pass statement activity other template",
                      "children": []
                    },
                    {
                      "text": "should pass statement activity performance template",
                      "children": []
                    },
                    {
                      "text": "should pass statement activity sequencing template",
                      "children": []
                    },
                    {
                      "text": "should pass statement activity true-false template",
                      "children": []
                    },
                    {
                      "text": "should pass statement substatement activity choice template",
                      "children": []
                    },
                    {
                      "text": "should pass statement substatement activity likert template",
                      "children": []
                    },
                    {
                      "text": "should pass statement substatement activity matching template",
                      "children": []
                    },
                    {
                      "text": "should pass statement substatement activity performance template",
                      "children": []
                    },
                    {
                      "text": "should pass statement substatement activity sequencing template",
                      "children": []
                    }
                  ]
                },
                {
                  "text": "An Activity Definition uses the following properties: name, description, type, moreInfo, interactionType, or extensions",
                  "children": [
                    {
                      "text": "statement activity \"definition\" missing all properties",
                      "children": []
                    },
                    {
                      "text": "statement activity \"definition\" contains \"name\"",
                      "children": []
                    },
                    {
                      "text": "statement activity \"definition\" contains \"description\"",
                      "children": []
                    },
                    {
                      "text": "statement activity \"definition\" contains \"type\"",
                      "children": []
                    },
                    {
                      "text": "statement activity \"definition\" contains \"moreInfo\"",
                      "children": []
                    },
                    {
                      "text": "statement activity \"definition\" contains \"extensions\"",
                      "children": []
                    },
                    {
                      "text": "statement activity \"definition\" contains \"interactionType\"",
                      "children": []
                    },
                    {
                      "text": "statement substatement activity \"definition\" missing all properties",
                      "children": []
                    },
                    {
                      "text": "statement substatement activity \"definition\" contains \"name\"",
                      "children": []
                    },
                    {
                      "text": "statement substatement activity \"definition\" contains \"description\"",
                      "children": []
                    },
                    {
                      "text": "statement substatement activity \"definition\" contains \"type\"",
                      "children": []
                    },
                    {
                      "text": "statement substatement activity \"definition\" contains \"moreInfo\"",
                      "children": []
                    },
                    {
                      "text": "statement substatement activity \"definition\" contains \"extensions\"",
                      "children": []
                    },
                    {
                      "text": "statement substatement activity \"definition\" contains \"interactionType\"",
                      "children": []
                    }
                  ]
                },
                {
                  "text": "SubStatements Verify Templates",
                  "children": [
                    {
                      "text": "should pass statement SubStatement template",
                      "children": []
                    }
                  ]
                },
                {
                  "text": "StatementRefs Verify Templates",
                  "children": [
                    {
                      "text": "should pass statement StatementRef template",
                      "children": []
                    },
                    {
                      "text": "should pass substatement StatementRef template",
                      "children": []
                    }
                  ]
                },
                {
                  "text": "Results Verify Templates",
                  "children": [
                    {
                      "text": "should pass statement result template",
                      "children": []
                    },
                    {
                      "text": "should pass substatement result template",
                      "children": []
                    }
                  ]
                },
                {
                  "text": "Contexts Verify Templates",
                  "children": [
                    {
                      "text": "should pass statement context template",
                      "children": []
                    },
                    {
                      "text": "should pass substatement context template",
                      "children": []
                    }
                  ]
                },
                {
                  "text": "A ContextActivity is defined as a single Activity of the \"value\" of the \"contextActivities\" property",
                  "children": [
                    {
                      "text": "statement context \"contextActivities parent\" value is activity",
                      "children": []
                    },
                    {
                      "text": "statement context \"contextActivities grouping\" value is activity",
                      "children": []
                    },
                    {
                      "text": "statement context \"contextActivities category\" value is activity",
                      "children": []
                    },
                    {
                      "text": "statement context \"contextActivities other\" value is activity",
                      "children": []
                    },
                    {
                      "text": "statement substatement context \"contextActivities parent\" value is activity",
                      "children": []
                    },
                    {
                      "text": "statement substatement context \"contextActivities grouping\" value is activity",
                      "children": []
                    },
                    {
                      "text": "statement substatement context \"contextActivities category\" value is activity",
                      "children": []
                    },
                    {
                      "text": "statement substatement context \"contextActivities other\" value is activity",
                      "children": []
                    }
                  ]
                },
                {
                  "text": "Languages Verify Templates",
                  "children": [
                    {
                      "text": "should pass statement verb template",
                      "children": []
                    },
                    {
                      "text": "should pass statement object template",
                      "children": []
                    },
                    {
                      "text": "should pass statement attachment template",
                      "children": []
                    },
                    {
                      "text": "should pass statement substatement verb template",
                      "children": []
                    },
                    {
                      "text": "should pass statement substatement object template",
                      "children": []
                    }
                  ]
                }
              ]
            },
            {
              "text": "An LRS rejects with error code 400 Bad Request a Statement containing IRL or IRI values without a scheme.",
              "children": [
                {
                  "text": "should fail with bad verb id scheme",
                  "children": []
                },
                {
                  "text": "should fail with bad verb openid scheme",
                  "children": []
                },
                {
                  "text": "should fail with bad account homePage",
                  "children": []
                },
                {
                  "text": "should fail with bad object id",
                  "children": []
                },
                {
                  "text": "should fail with bad object type",
                  "children": []
                },
                {
                  "text": "should fail with bad object moreInfo",
                  "children": []
                },
                {
                  "text": "should fail with attachment bad usageType",
                  "children": []
                },
                {
                  "text": "should fail with bad attachment fileUrl",
                  "children": []
                },
                {
                  "text": "should fail with bad object definition extension",
                  "children": []
                },
                {
                  "text": "should fail with bad context extension",
                  "children": []
                },
                {
                  "text": "should fail with bad result extension",
                  "children": []
                }
              ]
            }
          ]
        },
        {
          "text": "Statement Lifecycle Requirements",
          "children": [
            {
              "text": "A Voiding Statement is defined as a Statement whose \"verb\" property's \"id\" property's IRI ending with \"voided\"",
              "children": [
                {
                  "text": "statement verb voided IRI ends with \"voided\" (WARNING: this applies \"Upon receiving a Statement that voids another, the LRS SHOULD NOT* reject the request on the grounds of the Object of that voiding Statement not being present\")",
                  "children": []
                }
              ]
            },
            {
              "text": "A Voiding Statement's \"objectType\" field has a value of \"StatementRef\"",
              "children": [
                {
                  "text": "statement verb voided uses substatement with \"StatementRef\"",
                  "children": []
                },
                {
                  "text": "statement verb voided does not use object \"StatementRef\"",
                  "children": []
                }
              ]
            },
            {
              "text": "A Voided Statement is defined as a Statement that is not a Voiding Statement and is the Target of a Voiding Statement within the LRS",
              "children": [
                {
                  "text": "should return a voided statement when using GET \"voidedStatementId\"",
                  "children": []
                },
                {
                  "text": "should return 404 when using GET with \"statementId\"",
                  "children": []
                }
              ]
            },
            {
              "text": "A Voiding Statement cannot Target another Voiding Statement",
              "children": [
                {
                  "text": "should not void an already voided statement",
                  "children": []
                },
                {
                  "text": "should not void a voiding statement",
                  "children": []
                }
              ]
            }
          ]
        },
        {
          "text": "Id Property Requirements",
          "children": [
            {
              "text": "All UUID types follow requirements of RFC4122",
              "children": [
                {
                  "text": "statement \"id\" invalid UUID with too many digits",
                  "children": []
                },
                {
                  "text": "statement \"id\" invalid UUID with non A-F",
                  "children": []
                },
                {
                  "text": "statement object statementref \"id\" invalid UUID with too many digits",
                  "children": []
                },
                {
                  "text": "statement object statementref \"id\" invalid UUID with non A-F",
                  "children": []
                },
                {
                  "text": "statement context \"registration\" invalid UUID with too many digits",
                  "children": []
                },
                {
                  "text": "statement context \"registration\" invalid UUID with non A-F",
                  "children": []
                },
                {
                  "text": "statement context \"statement\" invalid UUID with too many digits",
                  "children": []
                },
                {
                  "text": "statement substatement context \"statement\" invalid UUID with non A-F",
                  "children": []
                }
              ]
            },
            {
              "text": "All UUID types are in standard String form",
              "children": [
                {
                  "text": "statement \"id\" invalid numeric",
                  "children": []
                },
                {
                  "text": "statement \"id\" invalid object",
                  "children": []
                },
                {
                  "text": "statement object statementref \"id\" invalid numeric",
                  "children": []
                },
                {
                  "text": "statement object statementref \"id\" invalid object",
                  "children": []
                },
                {
                  "text": "statement context \"registration\" invalid numeric",
                  "children": []
                },
                {
                  "text": "statement context \"registration\" invalid object",
                  "children": []
                },
                {
                  "text": "statement context \"statement\" invalid numeric",
                  "children": []
                },
                {
                  "text": "statement substatement context \"statement\" invalid object",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS generates the \"id\" property of a Statement if none is provided",
              "children": [
                {
                  "text": "should complete an empty id property",
                  "children": []
                }
              ]
            }
          ]
        },
        {
          "text": "Actor Property Requirements",
          "children": [
            {
              "text": "An \"actor\" property's \"objectType\" property is either \"Agent\" or \"Group\"",
              "children": [
                {
                  "text": "statement actor \"objectType\" should fail when not \"Agent\"",
                  "children": []
                },
                {
                  "text": "statement actor \"objectType\" should fail when not \"Group\"",
                  "children": []
                },
                {
                  "text": "statement authority \"objectType\" should fail when not \"Agent\"",
                  "children": []
                },
                {
                  "text": "statement authority \"objectType\" should fail when not \"Group\"",
                  "children": []
                },
                {
                  "text": "statement context instructor \"objectType\" should fail when not \"Agent\"",
                  "children": []
                },
                {
                  "text": "statement context instructor \"objectType\" should fail when not \"Group\"",
                  "children": []
                },
                {
                  "text": "statement substatement as agent with \"objectType\" should fail when not \"Agent\"",
                  "children": []
                },
                {
                  "text": "statement substatement as group with \"objectType\" should fail when not \"Group\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s actor \"objectType\" should fail when not \"Agent\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s actor \"objectType\" should fail when not \"Group\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor \"objectType\" should fail when not \"Agent\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor \"objectType\" should fail when not \"Group\"",
                  "children": []
                }
              ]
            },
            {
              "text": "An \"objectType\" property is a String",
              "children": [
                {
                  "text": "statement actor \"objectType\" should fail numeric",
                  "children": []
                },
                {
                  "text": "statement actor \"objectType\" should fail object",
                  "children": []
                },
                {
                  "text": "statement authority \"objectType\" should fail numeric",
                  "children": []
                },
                {
                  "text": "statement authority \"objectType\" should fail object",
                  "children": []
                },
                {
                  "text": "statement context instructor \"objectType\" should fail numeric",
                  "children": []
                },
                {
                  "text": "statement context instructor \"objectType\" should fail object",
                  "children": []
                },
                {
                  "text": "statement substatement as agent with \"objectType\" should fail numeric",
                  "children": []
                },
                {
                  "text": "statement substatement as agent with \"objectType\" should fail object",
                  "children": []
                },
                {
                  "text": "statement substatement\"s agent \"objectType\" should fail numeric",
                  "children": []
                },
                {
                  "text": "statement substatement\"s agent \"objectType\" should fail object",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor \"objectType\" should fail numeric",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor \"objectType\" should fail object",
                  "children": []
                }
              ]
            },
            {
              "text": "A \"name\" property is a String",
              "children": [
                {
                  "text": "statement actor \"name\" should fail numeric",
                  "children": []
                },
                {
                  "text": "statement actor \"name\" should fail object",
                  "children": []
                },
                {
                  "text": "statement authority \"name\" should fail numeric",
                  "children": []
                },
                {
                  "text": "statement authority \"name\" should fail object",
                  "children": []
                },
                {
                  "text": "statement context instructor \"name\" should fail numeric",
                  "children": []
                },
                {
                  "text": "statement context instructor \"name\" should fail object",
                  "children": []
                },
                {
                  "text": "statement substatement as agent with \"name\" should fail numeric",
                  "children": []
                },
                {
                  "text": "statement substatement as agent with \"name\" should fail object",
                  "children": []
                },
                {
                  "text": "statement substatement\"s agent \"name\" should fail numeric",
                  "children": []
                },
                {
                  "text": "statement substatement\"s agent \"name\" should fail object",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor \"name\" should fail numeric",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor \"name\" should fail object",
                  "children": []
                }
              ]
            },
            {
              "text": "An \"actor\" property with \"objectType\" as \"Agent\" uses one of the following properties: \"mbox\", \"mbox_sha1sum\", \"openid\", \"account\"",
              "children": [
                {
                  "text": "statement actor without \"account\", \"mbox\", \"mbox_sha1sum\", \"openid\" should fail",
                  "children": []
                },
                {
                  "text": "statement actor \"account\" should pass",
                  "children": []
                },
                {
                  "text": "statement actor \"mbox\" should pass",
                  "children": []
                },
                {
                  "text": "statement actor \"mbox_sha1sum\" should pass",
                  "children": []
                },
                {
                  "text": "statement actor \"openid\" should pass",
                  "children": []
                },
                {
                  "text": "statement authority without \"account\", \"mbox\", \"mbox_sha1sum\", \"openid\" should fail",
                  "children": []
                },
                {
                  "text": "statement authority \"account\" should pass",
                  "children": []
                },
                {
                  "text": "statement authority \"mbox\" should pass",
                  "children": []
                },
                {
                  "text": "statement authority \"mbox_sha1sum\" should pass",
                  "children": []
                },
                {
                  "text": "statement authority \"openid\" should pass",
                  "children": []
                },
                {
                  "text": "statement context instructor without \"account\", \"mbox\", \"mbox_sha1sum\", \"openid\" should fail",
                  "children": []
                },
                {
                  "text": "statement context instructor \"account\" should pass",
                  "children": []
                },
                {
                  "text": "statement context instructor \"mbox\" should pass",
                  "children": []
                },
                {
                  "text": "statement context instructor \"mbox_sha1sum\" should pass",
                  "children": []
                },
                {
                  "text": "statement context instructor \"openid\" should pass",
                  "children": []
                },
                {
                  "text": "statement substatement as agent without \"account\", \"mbox\", \"mbox_sha1sum\", \"openid\" should fail",
                  "children": []
                },
                {
                  "text": "statement substatement as agent \"account\" should pass",
                  "children": []
                },
                {
                  "text": "statement substatement as agent \"mbox\" should pass",
                  "children": []
                },
                {
                  "text": "statement substatement as agent \"mbox_sha1sum\" should pass",
                  "children": []
                },
                {
                  "text": "statement substatement as agent \"openid\" should pass",
                  "children": []
                },
                {
                  "text": "statement substatement\"s agent without \"account\", \"mbox\", \"mbox_sha1sum\", \"openid\" should fail",
                  "children": []
                },
                {
                  "text": "statement substatement\"s agent \"account\" should pass",
                  "children": []
                },
                {
                  "text": "statement substatement\"s agent \"mbox\" should pass",
                  "children": []
                },
                {
                  "text": "statement substatement\"s agent \"mbox_sha1sum\" should pass",
                  "children": []
                },
                {
                  "text": "statement substatement\"s agent \"openid\" should pass",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor without \"account\", \"mbox\", \"mbox_sha1sum\", \"openid\" should fail",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor \"account\" should pass",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor \"mbox\" should pass",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor \"mbox_sha1sum\" should pass",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor \"openid\" should pass",
                  "children": []
                }
              ]
            },
            {
              "text": "An Agent is defined by \"objectType\" of an \"actor\" property or \"object\" property with value \"Agent\"",
              "children": [
                {
                  "text": "statement actor does not require objectType",
                  "children": []
                },
                {
                  "text": "statement actor \"objectType\" accepts \"Agent\"",
                  "children": []
                },
                {
                  "text": "statement authority \"objectType\" accepts \"Agent\"",
                  "children": []
                },
                {
                  "text": "statement context instructor \"objectType\" accepts \"Agent\"",
                  "children": []
                },
                {
                  "text": "statement substatement as agent \"objectType\" accepts \"Agent\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s agent \"objectType\" accepts \"Agent\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor \"objectType\" accepts \"Agent\"",
                  "children": []
                }
              ]
            },
            {
              "text": "An Agent does not use the \"mbox\" property if \"mbox_sha1sum\", \"openid\", or \"account\" are used",
              "children": [
                {
                  "text": "statement actor \"mbox\" cannot be used with \"account\"",
                  "children": []
                },
                {
                  "text": "statement actor \"mbox\" cannot be used with \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement actor \"mbox\" cannot be used with \"openid\"",
                  "children": []
                },
                {
                  "text": "statement authority \"mbox\" cannot be used with \"account\"",
                  "children": []
                },
                {
                  "text": "statement authority \"mbox\" cannot be used with \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement authority \"mbox\" cannot be used with \"openid\"",
                  "children": []
                },
                {
                  "text": "statement context instructor \"mbox\" cannot be used with \"account\"",
                  "children": []
                },
                {
                  "text": "statement context instructor \"mbox\" cannot be used with \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement context instructor \"mbox\" cannot be used with \"openid\"",
                  "children": []
                },
                {
                  "text": "statement substatement as agent \"mbox\" cannot be used with \"account\"",
                  "children": []
                },
                {
                  "text": "statement substatement as agent \"mbox\" cannot be used with \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement substatement as agent \"mbox\" cannot be used with \"openid\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s agent \"mbox\" cannot be used with \"account\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s agent \"mbox\" cannot be used with \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s agent \"mbox\" cannot be used with \"openid\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor \"mbox\" cannot be used with \"account\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor \"mbox\" cannot be used with \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor \"mbox\" cannot be used with \"openid\"",
                  "children": []
                }
              ]
            },
            {
              "text": "An Agent does not use the \"mbox_sha1sum\" property if \"mbox\", \"openid\", or \"account\" are used",
              "children": [
                {
                  "text": "statement actor \"mbox_sha1sum\" cannot be used with \"account\"",
                  "children": []
                },
                {
                  "text": "statement actor \"mbox_sha1sum\" cannot be used with \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement actor \"mbox_sha1sum\" cannot be used with \"openid\"",
                  "children": []
                },
                {
                  "text": "statement authority \"mbox_sha1sum\" cannot be used with \"account\"",
                  "children": []
                },
                {
                  "text": "statement authority \"mbox_sha1sum\" cannot be used with \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement authority \"mbox_sha1sum\" cannot be used with \"openid\"",
                  "children": []
                },
                {
                  "text": "statement context instructor \"mbox_sha1sum\" cannot be used with \"account\"",
                  "children": []
                },
                {
                  "text": "statement context instructor \"mbox_sha1sum\" cannot be used with \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement context instructor \"mbox_sha1sum\" cannot be used with \"openid\"",
                  "children": []
                },
                {
                  "text": "statement substatement as agent \"mbox_sha1sum\" cannot be used with \"account\"",
                  "children": []
                },
                {
                  "text": "statement substatement as agent \"mbox_sha1sum\" cannot be used with \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement substatement as agent \"mbox_sha1sum\" cannot be used with \"openid\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s agent \"mbox_sha1sum\" cannot be used with \"account\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s agent \"mbox_sha1sum\" cannot be used with \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s agent \"mbox_sha1sum\" cannot be used with \"openid\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor \"mbox_sha1sum\" cannot be used with \"account\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor \"mbox_sha1sum\" cannot be used with \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor \"mbox_sha1sum\" cannot be used with \"openid\"",
                  "children": []
                }
              ]
            },
            {
              "text": "An Agent does not use the \"account\" property if \"mbox\", \"mbox_sha1sum\", or \"openid\" are used",
              "children": [
                {
                  "text": "statement actor \"account\" cannot be used with \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement actor \"account\" cannot be used with \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement actor \"account\" cannot be used with \"openid\"",
                  "children": []
                },
                {
                  "text": "statement authority \"account\" cannot be used with \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement authority \"account\" cannot be used with \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement authority \"account\" cannot be used with \"openid\"",
                  "children": []
                },
                {
                  "text": "statement context instructor \"account\" cannot be used with \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement context instructor \"account\" cannot be used with \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement context instructor \"account\" cannot be used with \"openid\"",
                  "children": []
                },
                {
                  "text": "statement substatement as agent \"account\" cannot be used with \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement substatement as agent \"account\" cannot be used with \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement substatement as agent \"account\" cannot be used with \"openid\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s agent \"account\" cannot be used with \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s agent \"account\" cannot be used with \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s agent \"account\" cannot be used with \"openid\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor \"account\" cannot be used with \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor \"account\" cannot be used with \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor \"account\" cannot be used with \"openid\"",
                  "children": []
                }
              ]
            },
            {
              "text": "An Agent does not use the \"openid\" property if \"mbox\", \"mbox_sha1sum\", or \"account\" are used",
              "children": [
                {
                  "text": "statement actor \"openid\" cannot be used with \"account\"",
                  "children": []
                },
                {
                  "text": "statement actor \"openid\" cannot be used with \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement actor \"openid\" cannot be used with \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement authority \"openid\" cannot be used with \"account\"",
                  "children": []
                },
                {
                  "text": "statement authority \"openid\" cannot be used with \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement authority \"openid\" cannot be used with \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement context instructor \"openid\" cannot be used with \"account\"",
                  "children": []
                },
                {
                  "text": "statement context instructor \"openid\" cannot be used with \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement context instructor \"openid\" cannot be used with \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement substatement as agent \"openid\" cannot be used with \"account\"",
                  "children": []
                },
                {
                  "text": "statement substatement as agent \"openid\" cannot be used with \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement substatement as agent \"openid\" cannot be used with \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s agent \"openid\" cannot be used with \"account\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s agent \"openid\" cannot be used with \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s agent \"openid\" cannot be used with \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor \"openid\" cannot be used with \"account\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor \"openid\" cannot be used with \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor \"openid\" cannot be used with \"mbox_sha1sum\"",
                  "children": []
                }
              ]
            },
            {
              "text": "An Anonymous Group uses the \"member\" property",
              "children": [
                {
                  "text": "statement actor anonymous group missing member",
                  "children": []
                },
                {
                  "text": "statement authority anonymous group missing member",
                  "children": []
                },
                {
                  "text": "statement context instructor anonymous group missing member",
                  "children": []
                },
                {
                  "text": "statement context team anonymous group missing member",
                  "children": []
                },
                {
                  "text": "statement substatement as group anonymous group missing member",
                  "children": []
                },
                {
                  "text": "statement substatement\"s group anonymous group missing member",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor anonymous group missing member",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context team anonymous group missing member",
                  "children": []
                }
              ]
            },
            {
              "text": "The \"member\" property is an array of Objects following Agent requirements",
              "children": [
                {
                  "text": "statement actor requires member type \"array\"",
                  "children": []
                },
                {
                  "text": "statement authority requires member type \"array\"",
                  "children": []
                },
                {
                  "text": "statement context instructor requires member type \"array\"",
                  "children": []
                },
                {
                  "text": "statement context team requires member type \"array\"",
                  "children": []
                },
                {
                  "text": "statement substatement as group requires member type \"array\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s group requires member type \"array\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor requires member type \"array\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context team requires member type \"array\"",
                  "children": []
                }
              ]
            },
            {
              "text": "An Identified Group is defined by \"objectType\" of an \"actor\" or \"object\" with value \"Group\" and by one of \"mbox\", \"mbox_sha1sum\", \"openid\", or \"account\" being used",
              "children": [
                {
                  "text": "statement actor identified group accepts \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement actor identified group accepts \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement actor identified group accepts \"openid\"",
                  "children": []
                },
                {
                  "text": "statement actor identified group accepts \"account\"",
                  "children": []
                },
                {
                  "text": "statement context instructor identified group accepts \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement context instructor identified group accepts \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement context instructor identified group accepts \"openid\"",
                  "children": []
                },
                {
                  "text": "statement context instructor identified group accepts \"account\"",
                  "children": []
                },
                {
                  "text": "statement context team identified group accepts \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement context team identified group accepts \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement context team identified group accepts \"openid\"",
                  "children": []
                },
                {
                  "text": "statement context team identified group accepts \"account\"",
                  "children": []
                },
                {
                  "text": "statement substatement as group identified group accepts \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement substatement as group identified group accepts \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement substatement as group identified group accepts \"openid\"",
                  "children": []
                },
                {
                  "text": "statement substatement as group identified group accepts \"account\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s group identified group accepts \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s group identified group accepts \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s group identified group accepts \"openid\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s group identified group accepts \"account\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor identified group accepts \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor identified group accepts \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor identified group accepts \"openid\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor identified group accepts \"account\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context team identified group accepts \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context team identified group accepts \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context team identified group accepts \"openid\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context team identified group accepts \"account\"",
                  "children": []
                }
              ]
            },
            {
              "text": "An Identified Group uses one of the following properties: \"mbox\", \"mbox_sha1sum\", \"openid\", \"account\"",
              "children": [
                {
                  "text": "statement actor identified group accepts \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement actor identified group accepts \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement actor identified group accepts \"openid\"",
                  "children": []
                },
                {
                  "text": "statement actor identified group accepts \"account\"",
                  "children": []
                },
                {
                  "text": "statement context instructor identified group accepts \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement context instructor identified group accepts \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement context instructor identified group accepts \"openid\"",
                  "children": []
                },
                {
                  "text": "statement context instructor identified group accepts \"account\"",
                  "children": []
                },
                {
                  "text": "statement context team identified group accepts \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement context team identified group accepts \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement context team identified group accepts \"openid\"",
                  "children": []
                },
                {
                  "text": "statement context team identified group accepts \"account\"",
                  "children": []
                },
                {
                  "text": "statement substatement as group identified group accepts \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement substatement as group identified group accepts \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement substatement as group identified group accepts \"openid\"",
                  "children": []
                },
                {
                  "text": "statement substatement as group identified group accepts \"account\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s group identified group accepts \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s group identified group accepts \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s group identified group accepts \"openid\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s group identified group accepts \"account\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor identified group accepts \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor identified group accepts \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor identified group accepts \"openid\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor identified group accepts \"account\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context team identified group accepts \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context team identified group accepts \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context team identified group accepts \"openid\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context team identified group accepts \"account\"",
                  "children": []
                }
              ]
            },
            {
              "text": "An Identified Group does not use the \"mbox\" property if \"mbox_sha1sum\", \"openid\", or \"account\" are used",
              "children": [
                {
                  "text": "statement actor \"mbox\" cannot be used with \"account\"",
                  "children": []
                },
                {
                  "text": "statement actor \"mbox\" cannot be used with \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement actor \"mbox\" cannot be used with \"openid",
                  "children": []
                },
                {
                  "text": "statement authority \"mbox\" cannot be used with \"account\"",
                  "children": []
                },
                {
                  "text": "statement authority \"mbox\" cannot be used with \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement authority \"mbox\" cannot be used with \"openid\"",
                  "children": []
                },
                {
                  "text": "statement context instructor \"mbox\" cannot be used with \"account\"",
                  "children": []
                },
                {
                  "text": "statement context instructor \"mbox\" cannot be used with \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement context instructor \"mbox\" cannot be used with \"openid\"",
                  "children": []
                },
                {
                  "text": "statement context team \"mbox\" cannot be used with \"account\"",
                  "children": []
                },
                {
                  "text": "statement context team \"mbox\" cannot be used with \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement context team \"mbox\" cannot be used with \"openid\"",
                  "children": []
                },
                {
                  "text": "statement substatement as group \"mbox\" cannot be used with \"account\"",
                  "children": []
                },
                {
                  "text": "statement substatement as group \"mbox\" cannot be used with \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement substatement as group \"mbox\" cannot be used with \"openid\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s agent \"mbox\" cannot be used with \"account\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s agent \"mbox\" cannot be used with \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s agent \"mbox\" cannot be used with \"openid\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor \"mbox\" cannot be used with \"account\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor \"mbox\" cannot be used with \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor \"mbox\" cannot be used with \"openid\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context team \"mbox\" cannot be used with \"account\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context team \"mbox\" cannot be used with \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context team \"mbox\" cannot be used with \"openid\"",
                  "children": []
                }
              ]
            },
            {
              "text": "An Identified Group does not use the \"mbox_sha1sum\" property if \"mbox\", \"openid\", or \"account\" are used",
              "children": [
                {
                  "text": "statement actor \"mbox_sha1sum\" cannot be used with \"account\"",
                  "children": []
                },
                {
                  "text": "statement actor \"mbox_sha1sum\" cannot be used with \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement actor \"mbox_sha1sum\" cannot be used with \"openid",
                  "children": []
                },
                {
                  "text": "statement authority \"mbox_sha1sum\" cannot be used with \"account\"",
                  "children": []
                },
                {
                  "text": "statement authority \"mbox_sha1sum\" cannot be used with \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement authority \"mbox_sha1sum\" cannot be used with \"openid\"",
                  "children": []
                },
                {
                  "text": "statement context instructor \"mbox_sha1sum\" cannot be used with \"account\"",
                  "children": []
                },
                {
                  "text": "statement context instructor \"mbox_sha1sum\" cannot be used with \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement context team \"mbox_sha1sum\" cannot be used with \"openid\"",
                  "children": []
                },
                {
                  "text": "statement context team \"mbox_sha1sum\" cannot be used with \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement context team \"mbox_sha1sum\" cannot be used with \"openid\"",
                  "children": []
                },
                {
                  "text": "statement substatement as group \"mbox_sha1sum\" cannot be used with \"account\"",
                  "children": []
                },
                {
                  "text": "statement substatement as group \"mbox_sha1sum\" cannot be used with \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement substatement as group \"mbox_sha1sum\" cannot be used with \"openid\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s agent \"mbox_sha1sum\" cannot be used with \"account\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s agent \"mbox_sha1sum\" cannot be used with \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s agent \"mbox_sha1sum\" cannot be used with \"openid\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor \"mbox_sha1sum\" cannot be used with \"account\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor \"mbox_sha1sum\" cannot be used with \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor \"mbox_sha1sum\" cannot be used with \"openid\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context team \"mbox_sha1sum\" cannot be used with \"account\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context team \"mbox_sha1sum\" cannot be used with \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context team \"mbox_sha1sum\" cannot be used with \"openid\"",
                  "children": []
                }
              ]
            },
            {
              "text": "An Identified Group does not use the \"openid\" property if \"mbox\", \"mbox_sha1sum\", or \"account\" are used",
              "children": [
                {
                  "text": "statement actor \"openid\" cannot be used with \"account",
                  "children": []
                },
                {
                  "text": "statement actor \"openid\" cannot be used with \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement actor \"openid\" cannot be used with \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement authority \"openid\" cannot be used with \"account\"",
                  "children": []
                },
                {
                  "text": "statement authority \"openid\" cannot be used with \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement authority \"openid\" cannot be used with \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement context instructor \"openid\" cannot be used with \"account\"",
                  "children": []
                },
                {
                  "text": "statement context instructor \"openid\" cannot be used with \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement context instructor \"openid\" cannot be used with \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement context team \"openid\" cannot be used with \"account\"",
                  "children": []
                },
                {
                  "text": "statement context team \"openid\" cannot be used with \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement context team \"openid\" cannot be used with \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement substatement as group \"openid\" cannot be used with \"account\"",
                  "children": []
                },
                {
                  "text": "statement substatement as group \"openid\" cannot be used with \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement substatement as group \"openid\" cannot be used with \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s agent \"openid\" cannot be used with \"account\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s agent \"openid\" cannot be used with \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s agent \"openid\" cannot be used with \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor \"openid\" cannot be used with \"account\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor \"openid\" cannot be used with \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor \"openid\" cannot be used with \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context team \"openid\" cannot be used with \"account\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context team \"openid\" cannot be used with \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context team \"openid\" cannot be used with \"mbox_sha1sum\"",
                  "children": []
                }
              ]
            },
            {
              "text": "An Identified Group does not use the \"account\" property if \"mbox\", \"mbox_sha1sum\", or \"openid\" are used",
              "children": [
                {
                  "text": "statement actor \"account\" cannot be used with \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement actor \"account\" cannot be used with \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement actor \"account\" cannot be used with \"openid",
                  "children": []
                },
                {
                  "text": "statement authority \"account\" cannot be used with \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement authority \"account\" cannot be used with \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement authority \"account\" cannot be used with \"openid\"",
                  "children": []
                },
                {
                  "text": "statement context instructor \"account\" cannot be used with \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement context instructor \"account\" cannot be used with \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement context instructor \"account\" cannot be used with \"openid\"",
                  "children": []
                },
                {
                  "text": "statement context team \"account\" cannot be used with \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement context team \"account\" cannot be used with \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement context team \"account\" cannot be used with \"openid\"",
                  "children": []
                },
                {
                  "text": "statement substatement as group \"account\" cannot be used with \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement substatement as group \"account\" cannot be used with \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement substatement as group \"account\" cannot be used with \"openid\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s agent \"account\" cannot be used with \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s agent \"account\" cannot be used with \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s agent \"account\" cannot be used with \"openid\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor \"account\" cannot be used with \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor \"account\" cannot be used with \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor \"account\" cannot be used with \"openid\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context team \"account\" cannot be used with \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context team \"account\" cannot be used with \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context team \"account\" cannot be used with \"openid\"",
                  "children": []
                }
              ]
            },
            {
              "text": "An \"mbox\" property has the form \"mailto:email address\" and is an IRI",
              "children": [
                {
                  "text": "statement actor \"agent mbox\" not IRI",
                  "children": []
                },
                {
                  "text": "statement actor \"group mbox\" not IRI",
                  "children": []
                },
                {
                  "text": "statement authority \"agent mbox\" not IRI",
                  "children": []
                },
                {
                  "text": "statement authority \"group mbox\" not IRI",
                  "children": []
                },
                {
                  "text": "statement context instructor \"agent mbox\" not IRI",
                  "children": []
                },
                {
                  "text": "statement context instructor \"group mbox\" not IRI",
                  "children": []
                },
                {
                  "text": "statement context team \"group mbox\" not IRI",
                  "children": []
                },
                {
                  "text": "statement substatement as \"agent mbox\" not IRI",
                  "children": []
                },
                {
                  "text": "statement substatement as \"group mbox\" not IRI",
                  "children": []
                },
                {
                  "text": "statement substatement\"s \"agent mbox\" not IRI",
                  "children": []
                },
                {
                  "text": "statement substatement\"s \"group mbox\" not IRI",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor \"agent mbox\" not IRI",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor \"group mbox\" not IRI",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context team \"group mbox\" not IRI",
                  "children": []
                },
                {
                  "text": "statement actor \"agent mbox\" not mailto:email address",
                  "children": []
                },
                {
                  "text": "statement actor \"group mbox\" not mailto:email address",
                  "children": []
                },
                {
                  "text": "statement authority \"agent mbox\" not mailto:email address",
                  "children": []
                },
                {
                  "text": "statement authority \"group mbox\" not mailto:email address",
                  "children": []
                },
                {
                  "text": "statement context instructor \"agent mbox\" not mailto:email address",
                  "children": []
                },
                {
                  "text": "statement context instructor \"group mbox\" not mailto:email address",
                  "children": []
                },
                {
                  "text": "statement context team \"group mbox\" not mailto:email address",
                  "children": []
                },
                {
                  "text": "statement substatement as \"agent mbox\" not mailto:email address",
                  "children": []
                },
                {
                  "text": "statement substatement as \"group mbox\" not mailto:email address",
                  "children": []
                },
                {
                  "text": "statement substatement\"s \"agent mbox\" not mailto:email address",
                  "children": []
                },
                {
                  "text": "statement substatement\"s \"group mbox\" not mailto:email address",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor \"agent mbox\" not mailto:email address",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor \"group mbox\" not mailto:email address",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context team \"group mbox\" not mailto:email address",
                  "children": []
                }
              ]
            },
            {
              "text": "An \"mbox_sha1sum\" property is a String",
              "children": [
                {
                  "text": "statement actor \"agent mbox_sha1sum\" not string",
                  "children": []
                },
                {
                  "text": "statement actor \"group mbox_sha1sum\" not string",
                  "children": []
                },
                {
                  "text": "statement authority \"agent mbox_sha1sum\" not string",
                  "children": []
                },
                {
                  "text": "statement authority \"group mbox_sha1sum\" not string",
                  "children": []
                },
                {
                  "text": "statement context instructor \"agent mbox_sha1sum\" not string",
                  "children": []
                },
                {
                  "text": "statement context instructor \"group mbox_sha1sum\" not string",
                  "children": []
                },
                {
                  "text": "statement context team \"group mbox_sha1sum\" not string",
                  "children": []
                },
                {
                  "text": "statement substatement as \"agent mbox_sha1sum\" not string",
                  "children": []
                },
                {
                  "text": "statement substatement as \"group mbox_sha1sum\" not string",
                  "children": []
                },
                {
                  "text": "statement substatement\"s \"agent mbox_sha1sum\" not string",
                  "children": []
                },
                {
                  "text": "statement substatement\"s \"group mbox_sha1sum\" not string",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor \"agent mbox_sha1sum\" not string",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor \"group mbox_sha1sum\" not string",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context team \"group mbox_sha1sum\" not string",
                  "children": []
                }
              ]
            },
            {
              "text": "An \"openid\" property is a URI",
              "children": [
                {
                  "text": "statement actor \"agent openid\" not URI",
                  "children": []
                },
                {
                  "text": "statement actor \"group openid\" not URI",
                  "children": []
                },
                {
                  "text": "statement authority \"agent openid\" not URI",
                  "children": []
                },
                {
                  "text": "statement authority \"group openid\" not URI",
                  "children": []
                },
                {
                  "text": "statement context instructor \"agent openid\" not URI",
                  "children": []
                },
                {
                  "text": "statement context instructor \"group openid\" not URI",
                  "children": []
                },
                {
                  "text": "statement context team \"group openid\" not URI",
                  "children": []
                },
                {
                  "text": "statement substatement as \"agent openid\" not URI",
                  "children": []
                },
                {
                  "text": "statement substatement as \"group openid\" not URI",
                  "children": []
                },
                {
                  "text": "statement substatement\"s \"agent openid\" not URI",
                  "children": []
                },
                {
                  "text": "statement substatement\"s \"group openid\" not URI",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor \"agent openid\" not URI",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor \"group openid\" not URI",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context team \"group openid\" not URI",
                  "children": []
                }
              ]
            },
            {
              "text": "An Account Object is the \"account\" property of a Group or Agent",
              "children": [
                {
                  "text": "statement actor \"agent account\" property exists",
                  "children": []
                },
                {
                  "text": "statement actor \"group account\" property exists",
                  "children": []
                },
                {
                  "text": "statement authority \"agent account\" property exists",
                  "children": []
                },
                {
                  "text": "statement authority \"group account\" property exists",
                  "children": []
                },
                {
                  "text": "statement context instructor \"agent account\" property exists",
                  "children": []
                },
                {
                  "text": "statement context instructor \"group account\" property exists",
                  "children": []
                },
                {
                  "text": "statement context team \"group account\" property exists",
                  "children": []
                },
                {
                  "text": "statement substatement as \"agent account\" property exists",
                  "children": []
                },
                {
                  "text": "statement substatement as \"group account\" property exists",
                  "children": []
                },
                {
                  "text": "statement substatement\"s \"agent account\" property exists",
                  "children": []
                },
                {
                  "text": "statement substatement\"s \"group account\" property exists",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor \"agent account\" property exists",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor \"group account\" property exists",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context team \"group account\" property exists",
                  "children": []
                }
              ]
            },
            {
              "text": "An Account Object uses the \"homePage\" property",
              "children": [
                {
                  "text": "statement actor \"agent\" account \"homePage\" property exists",
                  "children": []
                },
                {
                  "text": "statement actor \"group\" account \"homePage\" property exists",
                  "children": []
                },
                {
                  "text": "statement authority \"agent\" account \"homePage\" property exists",
                  "children": []
                },
                {
                  "text": "statement authority \"group\" account \"homePage\" property exists",
                  "children": []
                },
                {
                  "text": "statement context instructor \"agent\" account \"homePage\" property exists",
                  "children": []
                },
                {
                  "text": "statement context instructor \"group\" account \"homePage\" property exists",
                  "children": []
                },
                {
                  "text": "statement context team \"group\" account \"homePage\" property exists",
                  "children": []
                },
                {
                  "text": "statement substatement as \"agent\" account \"homePage\" property exists",
                  "children": []
                },
                {
                  "text": "statement substatement as \"group\" account \"homePage\" property exists",
                  "children": []
                },
                {
                  "text": "statement substatement\"s \"agent\" account \"homePage\" property exists",
                  "children": []
                },
                {
                  "text": "statement substatement\"s \"group\" account \"homePage\" property exists",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor \"agent\" account \"homePage\" property exists",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor \"group\" account \"homePage\" property exists",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context team \"group\" account \"homePage\" property exists",
                  "children": []
                }
              ]
            },
            {
              "text": "An Account Object's \"homePage\" property is an IRL",
              "children": [
                {
                  "text": "statement actor \"agent\" account \"homePage property is IRL",
                  "children": []
                },
                {
                  "text": "statement actor \"group\" account \"homePage property is IRL",
                  "children": []
                },
                {
                  "text": "statement authority \"agent\" account \"homePage property is IRL",
                  "children": []
                },
                {
                  "text": "statement authority \"group\" account \"homePage property is IRL",
                  "children": []
                },
                {
                  "text": "statement context instructor \"agent\" account \"homePage property is IRL",
                  "children": []
                },
                {
                  "text": "statement context instructor \"group\" account \"homePage property is IRL",
                  "children": []
                },
                {
                  "text": "statement context team \"group\" account \"homePage property is IRL",
                  "children": []
                },
                {
                  "text": "statement substatement as \"agent\" account \"homePage property is IRL",
                  "children": []
                },
                {
                  "text": "statement substatement as \"group\" account \"homePage property is IRL",
                  "children": []
                },
                {
                  "text": "statement substatement\"s \"agent\" account \"homePage property is IRL",
                  "children": []
                },
                {
                  "text": "statement substatement\"s \"group\" account \"homePage property is IRL",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor \"agent\" account \"homePage property is IRL",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor \"group\" account \"homePage property is IRL",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context team \"group\" account \"homePage property is IRL",
                  "children": []
                }
              ]
            },
            {
              "text": "An Account Object uses the \"name\" property",
              "children": [
                {
                  "text": "statement actor \"agent\" account \"name\" property exists",
                  "children": []
                },
                {
                  "text": "statement actor \"group\" account \"name\" property exists",
                  "children": []
                },
                {
                  "text": "statement authority \"agent\" account \"name\" property exists",
                  "children": []
                },
                {
                  "text": "statement authority \"group\" account \"name\" property exists",
                  "children": []
                },
                {
                  "text": "statement context instructor \"agent\" account \"name\" property exists",
                  "children": []
                },
                {
                  "text": "statement context instructor \"group\" account \"name\" property exists",
                  "children": []
                },
                {
                  "text": "statement context team \"group\" account \"name\" property exists",
                  "children": []
                },
                {
                  "text": "statement substatement as \"agent\" account \"name\" property exists",
                  "children": []
                },
                {
                  "text": "statement substatement as \"group\" account \"name\" property exists",
                  "children": []
                },
                {
                  "text": "statement substatement\"s \"agent\" account \"name\" property exists",
                  "children": []
                },
                {
                  "text": "statement substatement\"s \"group\" account \"name\" property exists",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor \"agent\" account \"name\" property exists",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor \"group\" account \"name\" property exists",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context team \"group\" account \"name\" property exists",
                  "children": []
                }
              ]
            }
          ]
        },
        {
          "text": "Verb Property Requirements",
          "children": [
            {
              "text": "A \"verb\" property contains an \"id\" property",
              "children": [
                {
                  "text": "statement verb missing \"id\"",
                  "children": []
                },
                {
                  "text": "statement substatement verb missing \"id\"",
                  "children": []
                }
              ]
            },
            {
              "text": "A \"verb\" property's \"id\" property is an IRI",
              "children": [
                {
                  "text": "statement verb \"id\" not IRI",
                  "children": []
                },
                {
                  "text": "statement substatement verb \"id\" not IRI",
                  "children": []
                }
              ]
            },
            {
              "text": "A \"verb\" property's \"display\" property is a Language Map",
              "children": [
                {
                  "text": "statement verb \"display\" is numeric",
                  "children": []
                },
                {
                  "text": "statement verb \"display\" is string",
                  "children": []
                },
                {
                  "text": "statement substatement verb \"display\" is numeric",
                  "children": []
                },
                {
                  "text": "statement substatement verb \"display\" is string",
                  "children": []
                }
              ]
            }
          ]
        },
        {
          "text": "Object Property Requirements",
          "children": [
            {
              "text": "An \"object\" property's \"objectType\" property is either \"Activity\", \"Agent\", \"Group\", \"SubStatement\", or \"StatementRef\"",
              "children": [
                {
                  "text": "statement activity should fail on \"activity\"",
                  "children": []
                },
                {
                  "text": "statement substatement activity should fail on \"activity\"",
                  "children": []
                },
                {
                  "text": "statement agent template should fail on \"agent\"",
                  "children": []
                },
                {
                  "text": "statement substatement agent should fail on \"agent\"",
                  "children": []
                },
                {
                  "text": "statement group should fail on \"group\"",
                  "children": []
                },
                {
                  "text": "statement substatement group should fail on \"group\"",
                  "children": []
                },
                {
                  "text": "statement StatementRef should fail on \"statementref\"",
                  "children": []
                },
                {
                  "text": "statement substatement StatementRef should fail on \"statementref\"",
                  "children": []
                },
                {
                  "text": "statement SubStatement should fail on \"substatement\"",
                  "children": []
                }
              ]
            },
            {
              "text": "An \"object\" property uses the \"id\" property exactly one time",
              "children": [
                {
                  "text": "statement activity \"id\" not provided",
                  "children": []
                },
                {
                  "text": "statement substatement activity \"id\" not provided",
                  "children": []
                }
              ]
            },
            {
              "text": "An \"object\" property's \"id\" property is an IRI",
              "children": [
                {
                  "text": "statement activity \"id\" not IRI",
                  "children": []
                },
                {
                  "text": "statement activity \"id\" is IRI",
                  "children": []
                },
                {
                  "text": "statement substatement activity \"id\" not IRI",
                  "children": []
                },
                {
                  "text": "statement substatement activity \"id\" is IRI",
                  "children": []
                }
              ]
            },
            {
              "text": "An Activity's \"definition\" property is an Object",
              "children": [
                {
                  "text": "statement activity \"definition\" not object",
                  "children": []
                },
                {
                  "text": "statement substatement activity \"definition\" not object",
                  "children": []
                }
              ]
            },
            {
              "text": "An Activity Definition's \"name\" property is a Language Map",
              "children": [
                {
                  "text": "statement object \"name\" language map is numeric",
                  "children": []
                },
                {
                  "text": "statement object \"name\" language map is string",
                  "children": []
                },
                {
                  "text": "statement substatement activity \"name\" language map is numeric",
                  "children": []
                },
                {
                  "text": "statement substatement activity \"name\" language map is string",
                  "children": []
                }
              ]
            },
            {
              "text": "An Activity Definition's \"description\" property is a Language Map",
              "children": [
                {
                  "text": "statement object \"description\" language map is numeric",
                  "children": []
                },
                {
                  "text": "statement object \"description\" language map is string",
                  "children": []
                },
                {
                  "text": "statement substatement activity \"description\" language map is numeric",
                  "children": []
                },
                {
                  "text": "statement substatement activity \"description\" language map is string",
                  "children": []
                }
              ]
            },
            {
              "text": "An Activity Definition's \"type\" property is an IRI",
              "children": [
                {
                  "text": "statement activity \"type\" not IRI",
                  "children": []
                },
                {
                  "text": "statement substatement activity \"type\" not IRI",
                  "children": []
                }
              ]
            },
            {
              "text": "An Activity Definition's \"moreinfo\" property is an IRL",
              "children": [
                {
                  "text": "statement activity \"moreInfo\" not IRI",
                  "children": []
                },
                {
                  "text": "statement substatement activity \"moreInfo\" not IRI",
                  "children": []
                }
              ]
            },
            {
              "text": "An Activity Definition's \"interactionType\" property is a String with a value of either “true-false”, “choice”, “fill-in”, “long-fill-in”, “matching”, “performance”, “sequencing”, “likert”, “numeric” or “other”",
              "children": [
                {
                  "text": "statement activity \"interactionType\" can be used with \"true-false\"",
                  "children": []
                },
                {
                  "text": "statement activity \"interactionType\" can be used with \"choice\"",
                  "children": []
                },
                {
                  "text": "statement activity \"interactionType\" can be used with \"fill-in\"",
                  "children": []
                },
                {
                  "text": "statement activity \"interactionType\" can be used with \"long-fill-in\"",
                  "children": []
                },
                {
                  "text": "statement activity \"interactionType\" can be used with \"matching\"",
                  "children": []
                },
                {
                  "text": "statement activity \"interactionType\" can be used with \"performance\"",
                  "children": []
                },
                {
                  "text": "statement activity \"interactionType\" can be used with \"sequencing\"",
                  "children": []
                },
                {
                  "text": "statement activity \"interactionType\" can be used with \"likert\"",
                  "children": []
                },
                {
                  "text": "statement activity \"interactionType\" can be used with \"numeric\"",
                  "children": []
                },
                {
                  "text": "statement activity \"interactionType\" can be used with \"other\"",
                  "children": []
                },
                {
                  "text": "statement activity \"interactionType\" fails with invalid iri",
                  "children": []
                },
                {
                  "text": "statement activity \"interactionType\" fails with invalid numeric",
                  "children": []
                },
                {
                  "text": "statement activity \"interactionType\" fails with invalid object",
                  "children": []
                },
                {
                  "text": "statement activity \"interactionType\" fails with invalid string",
                  "children": []
                },
                {
                  "text": "statement substatement activity \"interactionType\" can be used with \"true-false\"",
                  "children": []
                },
                {
                  "text": "statement substatement activity \"interactionType\" can be used with \"choice\"",
                  "children": []
                },
                {
                  "text": "statement substatement activity \"interactionType\" can be used with \"fill-in\"",
                  "children": []
                },
                {
                  "text": "statement substatement activity \"interactionType\" can be used with \"long-fill-in\"",
                  "children": []
                },
                {
                  "text": "statement substatement activity \"interactionType\" can be used with \"matching\"",
                  "children": []
                },
                {
                  "text": "statement substatement activity \"interactionType\" can be used with \"performance\"",
                  "children": []
                },
                {
                  "text": "statement substatement activity \"interactionType\" can be used with \"sequencing\"",
                  "children": []
                },
                {
                  "text": "statement substatement activity \"interactionType\" can be used with \"likert\"",
                  "children": []
                },
                {
                  "text": "statement substatement activity \"interactionType\" can be used with \"numeric\"",
                  "children": []
                },
                {
                  "text": "statement substatement activity \"interactionType\" can be used with \"other\"",
                  "children": []
                },
                {
                  "text": "statement substatement activity \"interactionType\" fails with invalid iri",
                  "children": []
                },
                {
                  "text": "statement substatement activity \"interactionType\" fails with invalid numeric",
                  "children": []
                },
                {
                  "text": "statement substatement activity \"interactionType\" fails with invalid object",
                  "children": []
                },
                {
                  "text": "statement substatement activity \"interactionType\" fails with invalid string",
                  "children": []
                }
              ]
            },
            {
              "text": "An Activity Definition's \"extension\" property is an Object",
              "children": [
                {
                  "text": "statement activity \"extension\" invalid string",
                  "children": []
                },
                {
                  "text": "statement activity \"extension\" invalid iri",
                  "children": []
                },
                {
                  "text": "statement substatement activity \"extension\" invalid string",
                  "children": []
                },
                {
                  "text": "statement substatement activity \"extension\" invalid iri",
                  "children": []
                }
              ]
            },
            {
              "text": "An Activity Definition uses the \"interactionType\" property if any of the correctResponsesPattern, choices, scale, source, target, or steps properties are used",
              "children": [
                {
                  "text": "Activity Definition uses correctResponsesPattern without \"interactionType\" property",
                  "children": []
                },
                {
                  "text": "Activity Definition uses choices without \"interactionType\" property",
                  "children": []
                },
                {
                  "text": "Activity Definition uses fill-in without \"interactionType\" property",
                  "children": []
                },
                {
                  "text": "Activity Definition uses scale without \"interactionType\" property",
                  "children": []
                },
                {
                  "text": "Activity Definition uses long-fill-in without \"interactionType\" property",
                  "children": []
                },
                {
                  "text": "Activity Definition uses source without \"interactionType\" property",
                  "children": []
                },
                {
                  "text": "Activity Definition uses target without \"interactionType\" property",
                  "children": []
                },
                {
                  "text": "Activity Definition uses numeric without \"interactionType\" property",
                  "children": []
                },
                {
                  "text": "Activity Definition uses other without \"interactionType\" property",
                  "children": []
                },
                {
                  "text": "Activity Definition uses performance without \"interactionType\" property",
                  "children": []
                },
                {
                  "text": "Activity Definition uses sequencing without \"interactionType\" property",
                  "children": []
                },
                {
                  "text": "Activity Definition uses true-false without \"interactionType\" property",
                  "children": []
                }
              ]
            },
            {
              "text": "Statements that use an Agent or Group as an Object MUST specify an \"objectType\" property.",
              "children": [
                {
                  "text": "should fail when using agent as object and no objectType",
                  "children": []
                },
                {
                  "text": "should fail when using group as object and no objectType",
                  "children": []
                },
                {
                  "text": "substatement should fail when using agent as object and no objectType",
                  "children": []
                },
                {
                  "text": "substatement should fail when using group as object and no objectType",
                  "children": []
                }
              ]
            },
            {
              "text": "A Sub-Statement is defined by the \"objectType\" of an \"object\" with value \"SubStatement\"",
              "children": [
                {
                  "text": "substatement invalid when not \"SubStatement\"",
                  "children": []
                }
              ]
            },
            {
              "text": "A Sub-Statement follows the requirements of all Statements",
              "children": [
                {
                  "text": "substatement requires actor",
                  "children": []
                },
                {
                  "text": "substatement requires object",
                  "children": []
                },
                {
                  "text": "substatement requires verb",
                  "children": []
                },
                {
                  "text": "should pass substatement context",
                  "children": []
                },
                {
                  "text": "should pass substatement result",
                  "children": []
                },
                {
                  "text": "should pass substatement statementref",
                  "children": []
                },
                {
                  "text": "should pass substatement as agent",
                  "children": []
                },
                {
                  "text": "should pass substatement as group",
                  "children": []
                }
              ]
            },
            {
              "text": "A Sub-Statement cannot have a Sub-Statement",
              "children": [
                {
                  "text": "substatement invalid nested \"SubStatement\"",
                  "children": []
                }
              ]
            },
            {
              "text": "A Sub-Statement cannot use the \"id\" property at the Statement level",
              "children": [
                {
                  "text": "substatement invalid with property \"id\"",
                  "children": []
                }
              ]
            },
            {
              "text": "A Sub-Statement cannot use the \"stored\" property",
              "children": [
                {
                  "text": "substatement invalid with property \"stored\"",
                  "children": []
                }
              ]
            },
            {
              "text": "A Sub-Statement cannot use the \"version\" property",
              "children": [
                {
                  "text": "substatement invalid with property \"version\"",
                  "children": []
                }
              ]
            },
            {
              "text": "A Sub-Statement cannot use the \"authority\" property",
              "children": [
                {
                  "text": "substatement invalid with property \"authority\"",
                  "children": []
                }
              ]
            },
            {
              "text": "A Statement Reference is defined by the \"objectType\" of an \"object\" with value \"StatementRef\"",
              "children": [
                {
                  "text": "statementref invalid when not \"StatementRef\"",
                  "children": []
                },
                {
                  "text": "substatement statementref invalid when not \"StatementRef\"",
                  "children": []
                }
              ]
            },
            {
              "text": "A Statement Reference contains an \"id\" property",
              "children": [
                {
                  "text": "statementref invalid when missing \"id\"",
                  "children": []
                },
                {
                  "text": "substatement statementref invalid when missing \"id\"",
                  "children": []
                }
              ]
            },
            {
              "text": "A Statement Reference's \"id\" property is a UUID",
              "children": [
                {
                  "text": "statementref \"id\" not \"uuid\"",
                  "children": []
                },
                {
                  "text": "substatement statementref \"id\" not \"uuid\"",
                  "children": []
                }
              ]
            }
          ]
        },
        {
          "text": "Result Property Requirements",
          "children": [
            {
              "text": "A \"success\" property is a Boolean",
              "children": [
                {
                  "text": "statement result \"success\" property is string \"true\"",
                  "children": []
                },
                {
                  "text": "statement result \"success\" property is string \"false\"",
                  "children": []
                },
                {
                  "text": "statement substatement result \"success\" property is string \"true\"",
                  "children": []
                },
                {
                  "text": "statement substatement result \"success\" property is string \"false\"",
                  "children": []
                }
              ]
            },
            {
              "text": "A \"completion\" property is a Boolean",
              "children": [
                {
                  "text": "statement result \"completion\" property is string \"true\"",
                  "children": []
                },
                {
                  "text": "statement result \"completion\" property is string \"false\"",
                  "children": []
                },
                {
                  "text": "statement substatement result \"completion\" property is string \"true\"",
                  "children": []
                },
                {
                  "text": "statement substatement result \"completion\" property is string \"false\"",
                  "children": []
                }
              ]
            },
            {
              "text": "A \"response\" property is a String",
              "children": [
                {
                  "text": "statement result \"response\" property is numeric",
                  "children": []
                },
                {
                  "text": "statement result \"completion\" property is object",
                  "children": []
                },
                {
                  "text": "statement substatement result \"completion\" property is numeric",
                  "children": []
                },
                {
                  "text": "statement substatement result \"completion\" property is object",
                  "children": []
                }
              ]
            },
            {
              "text": "A \"duration\" property is a formatted to ISO 8601",
              "children": [
                {
                  "text": "statement result \"duration\" property is invalid",
                  "children": []
                },
                {
                  "text": "statement substatement result \"duration\" property is invalid",
                  "children": []
                },
                {
                  "text": "statement result \"duration\" property is valid",
                  "children": []
                },
                {
                  "text": "statement substatement result \"duration\" property is valid",
                  "children": []
                },
                {
                  "text": "statement result \"duration\" property is valid",
                  "children": []
                },
                {
                  "text": "statement substatement result \"duration\" property is valid",
                  "children": []
                },
                {
                  "text": "statement result \"duration\" property is valid",
                  "children": []
                },
                {
                  "text": "statement substatement result \"duration\" property is valid",
                  "children": []
                },
                {
                  "text": "statement result \"duration\" property is valid",
                  "children": []
                }
              ]
            },
            {
              "text": "An \"extensions\" property is an Object",
              "children": [
                {
                  "text": "statement result \"extensions\" property is numeric",
                  "children": []
                },
                {
                  "text": "statement result \"extensions\" property is string",
                  "children": []
                },
                {
                  "text": "statement substatement result \"extensions\" property is numeric",
                  "children": []
                },
                {
                  "text": "statement substatement result \"extensions\" property is string",
                  "children": []
                }
              ]
            },
            {
              "text": "A \"score\" property is an Object",
              "children": [
                {
                  "text": "statement result score numeric",
                  "children": []
                },
                {
                  "text": "statement result score string",
                  "children": []
                },
                {
                  "text": "statement substatement result score numeric",
                  "children": []
                },
                {
                  "text": "statement substatement result score string",
                  "children": []
                }
              ]
            },
            {
              "text": "A \"score\" Object's \"scaled\" property is a decimal number between -1 and 1, inclusive.",
              "children": [
                {
                  "text": "statement result \"scaled\" accepts decimal",
                  "children": []
                },
                {
                  "text": "statement substatement result \"scaled\" accepts decimal",
                  "children": []
                },
                {
                  "text": "statement result \"scaled\" should pass with value 1.0",
                  "children": []
                },
                {
                  "text": "statement substatement result \"scaled\" pass with value -1.0000",
                  "children": []
                },
                {
                  "text": "statement result \"scaled\" should reject with value 1.01",
                  "children": []
                },
                {
                  "text": "statement substatement result \"scaled\" reject with value -1.00001",
                  "children": []
                }
              ]
            },
            {
              "text": "A \"score\" Object's \"raw\" property is a decimal number between min and max, if present and otherwise unrestricted, inclusive",
              "children": [
                {
                  "text": "statement result \"raw\" accepts decimal",
                  "children": []
                },
                {
                  "text": "statement substatement result \"raw\" accepts decimal",
                  "children": []
                },
                {
                  "text": "statement result \"raw\" rejects raw greater than max",
                  "children": []
                },
                {
                  "text": "statement substatement result \"raw\" rejects raw greater than max",
                  "children": []
                },
                {
                  "text": "statement result \"raw\" rejects raw less than min",
                  "children": []
                },
                {
                  "text": "statement substatement result \"raw\" rejects raw less than min",
                  "children": []
                }
              ]
            },
            {
              "text": "A \"score\" Object's \"min\" property is a decimal number less than the \"max\" property, if it is present.",
              "children": [
                {
                  "text": "statement result \"min\" accepts decimal",
                  "children": []
                },
                {
                  "text": "statement substatement result \"min\" accepts decimal",
                  "children": []
                },
                {
                  "text": "statement result \"min\" rejects decimal number greater than \"max\"",
                  "children": []
                },
                {
                  "text": "statement substatement result \"min\" rejects decimal number greater than \"max\"",
                  "children": []
                }
              ]
            },
            {
              "text": "A \"score\" Object's \"max\" property is a Decimal accurate to seven significant decimal figures",
              "children": [
                {
                  "text": "statement result \"max\" accepts a decimal number more than the \"min\" property, if it is present.",
                  "children": []
                },
                {
                  "text": "statement substatement result \"max\" accepts a decimal number more than the \"min\" property, if it is present.",
                  "children": []
                },
                {
                  "text": "statement result \"max\" accepts a decimal number more than the \"min\" property, if it is present.",
                  "children": []
                },
                {
                  "text": "statement substatement result \"max\" accepts a decimal number more than the \"min\" property, if it is present.",
                  "children": []
                }
              ]
            }
          ]
        },
        {
          "text": "Context Property Requirements",
          "children": [
            {
              "text": "A \"registration\" property is a UUID",
              "children": [
                {
                  "text": "statement context \"registration\" is object",
                  "children": []
                },
                {
                  "text": "statement context \"registration\" is string",
                  "children": []
                },
                {
                  "text": "statement substatement context \"registration\" is object",
                  "children": []
                },
                {
                  "text": "statement substatement context \"registration\" is string",
                  "children": []
                }
              ]
            },
            {
              "text": "An \"instructor\" property is an Agent",
              "children": [
                {
                  "text": "statement context \"instructor\" is object",
                  "children": []
                },
                {
                  "text": "statement context \"instructor\" is string",
                  "children": []
                },
                {
                  "text": "statement substatement context \"instructor\" is object",
                  "children": []
                },
                {
                  "text": "statement substatement context \"instructor\" is string",
                  "children": []
                }
              ]
            },
            {
              "text": "An \"team\" property is a Group",
              "children": [
                {
                  "text": "statement context \"team\" is agent",
                  "children": []
                },
                {
                  "text": "statement context \"team\" is object",
                  "children": []
                },
                {
                  "text": "statement context \"team\" is string",
                  "children": []
                },
                {
                  "text": "statement substatement context \"team\" is agent",
                  "children": []
                },
                {
                  "text": "statement substatement context \"team\" is object",
                  "children": []
                },
                {
                  "text": "statement substatement context \"team\" is string",
                  "children": []
                }
              ]
            },
            {
              "text": "A \"contextActivities\" property is an Object",
              "children": [
                {
                  "text": "statement context \"contextActivities\" is string",
                  "children": []
                },
                {
                  "text": "statement substatement context \"contextActivities\" is string",
                  "children": []
                }
              ]
            },
            {
              "text": "A \"revision\" property is a String",
              "children": [
                {
                  "text": "statement context \"revision\" is numeric",
                  "children": []
                },
                {
                  "text": "statement context \"revision\" is object",
                  "children": []
                },
                {
                  "text": "statement substatement context \"revision\" is numeric",
                  "children": []
                },
                {
                  "text": "statement substatement context \"revision\" is object",
                  "children": []
                }
              ]
            },
            {
              "text": "A Statement cannot contain both a \"revision\" property in its \"context\" property and have the value of the \"object\" property's \"objectType\" be anything but \"Activity\"",
              "children": [
                {
                  "text": "statement context \"revision\" is invalid with object agent",
                  "children": []
                },
                {
                  "text": "statement context \"revision\" is invalid with object group",
                  "children": []
                },
                {
                  "text": "statement context \"revision\" is invalid with statementref",
                  "children": []
                },
                {
                  "text": "statement context \"revision\" is invalid with substatement",
                  "children": []
                },
                {
                  "text": "statement context \"revision\" is valid with no ObjectType",
                  "children": []
                },
                {
                  "text": "statement substatement context \"revision\" is invalid with object agent",
                  "children": []
                },
                {
                  "text": "statement substatement context \"revision\" is invalid with object group",
                  "children": []
                },
                {
                  "text": "statement substatement context \"revision\" is invalid with statementref",
                  "children": []
                },
                {
                  "text": "statement substatement context \"revision\" is valid with no objectType",
                  "children": []
                }
              ]
            },
            {
              "text": "A \"platform\" property is a String",
              "children": [
                {
                  "text": "statement context \"platform\" is numeric",
                  "children": []
                },
                {
                  "text": "statement context \"platform\" is object",
                  "children": []
                },
                {
                  "text": "statement substatement context \"platform\" is numeric",
                  "children": []
                },
                {
                  "text": "statement substatement context \"platform\" is object",
                  "children": []
                }
              ]
            },
            {
              "text": "A Statement cannot contain both a \"platform\" property in its \"context\" property and have the value of the \"object\" property's \"objectType\" be anything but \"Activity\"",
              "children": [
                {
                  "text": "statement context \"platform\" is invalid with object agent",
                  "children": []
                },
                {
                  "text": "statement context \"platform\" is invalid with object group",
                  "children": []
                },
                {
                  "text": "statement context \"platform\" is invalid with statementref",
                  "children": []
                },
                {
                  "text": "statement context \"platform\" is invalid with substatement",
                  "children": []
                },
                {
                  "text": "statement context \"platform\" is valid with empty objectType",
                  "children": []
                },
                {
                  "text": "statement substatement context \"platform\" is invalid with object agent",
                  "children": []
                },
                {
                  "text": "statement substatement context \"platform\" is invalid with object group",
                  "children": []
                },
                {
                  "text": "statement substatement context \"platform\" is invalid with statementref",
                  "children": []
                },
                {
                  "text": "statement substatement context \"platform\" is valid with empty ObjectType",
                  "children": []
                }
              ]
            },
            {
              "text": "A \"language\" property is a String",
              "children": [
                {
                  "text": "statement context \"language\" is numeric",
                  "children": []
                },
                {
                  "text": "statement context \"language\" is object",
                  "children": []
                },
                {
                  "text": "statement substatement context \"language\" is numeric",
                  "children": []
                },
                {
                  "text": "statement substatement context \"language\" is object",
                  "children": []
                },
                {
                  "text": "statement context \"language\" is is invalid language",
                  "children": []
                },
                {
                  "text": "statement substatement context \"language\" is is invalid language",
                  "children": []
                }
              ]
            },
            {
              "text": "A \"statement\" property is a Statement Reference",
              "children": [
                {
                  "text": "statement context \"statement\" invalid with \"statementref\"",
                  "children": []
                },
                {
                  "text": "statement context \"statement\" invalid with \"id\" not UUID",
                  "children": []
                },
                {
                  "text": "statement substatement context \"statement\" invalid with \"statementref\"",
                  "children": []
                },
                {
                  "text": "statement substatement context \"statement\" invalid with \"id\" not UUID",
                  "children": []
                }
              ]
            },
            {
              "text": "A \"contextActivities\" property's \"key\" has a value of \"parent\", \"grouping\", \"category\", or \"other\"",
              "children": [
                {
                  "text": "statement context \"contextActivities\" is \"parent\"",
                  "children": []
                },
                {
                  "text": "statement context \"contextActivities\" is \"grouping\"",
                  "children": []
                },
                {
                  "text": "statement context \"contextActivities\" is \"category\"",
                  "children": []
                },
                {
                  "text": "statement context \"contextActivities\" is \"other\"",
                  "children": []
                },
                {
                  "text": "statement context \"contextActivities\" accepts all property keys \"parent\", \"grouping\", \"category\", and \"other\"",
                  "children": []
                },
                {
                  "text": "statement context \"contextActivities\" rejects any property key other than \"parent\", \"grouping\", \"category\", or \"other\"",
                  "children": []
                },
                {
                  "text": "statement substatement context \"contextActivities\" is \"parent\"",
                  "children": []
                },
                {
                  "text": "statement substatement context \"contextActivities\" is \"grouping\"",
                  "children": []
                },
                {
                  "text": "statement substatement context \"contextActivities\" is \"category\"",
                  "children": []
                },
                {
                  "text": "statement substatement context \"contextActivities\" is \"other\"",
                  "children": []
                },
                {
                  "text": "statement substatement context \"contextActivities\" accepts all property keys \"parent\", \"grouping\", \"category\", and \"other\"",
                  "children": []
                },
                {
                  "text": "statement substatement context \"contextActivities\" rejects any property key other than \"parent\", \"grouping\", \"category\", or \"other\"",
                  "children": []
                }
              ]
            },
            {
              "text": "A \"contextActivities\" property's \"value\" is an Activity",
              "children": [
                {
                  "text": "statement context \"contextActivities parent\" value is activity array",
                  "children": []
                },
                {
                  "text": "statement context \"contextActivities grouping\" value is activity array",
                  "children": []
                },
                {
                  "text": "statement context \"contextActivities category\" value is activity array",
                  "children": []
                },
                {
                  "text": "statement context \"contextActivities other\" value is activity array",
                  "children": []
                },
                {
                  "text": "statement context contextActivities property's value is activity array with activities",
                  "children": []
                },
                {
                  "text": "statement substatement context \"contextActivities parent\" value is activity array",
                  "children": []
                },
                {
                  "text": "statement substatement context \"contextActivities grouping\" value is activity array",
                  "children": []
                },
                {
                  "text": "statement substatement context \"contextActivities category\" value is activity array",
                  "children": []
                },
                {
                  "text": "statement substatement context \"contextActivities other\" value is activity array",
                  "children": []
                },
                {
                  "text": "statement substatement context \"contextActivities property's value is activity array",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS returns a ContextActivity in an array, even if only a single ContextActivity is returned",
              "children": [
                {
                  "text": "should return array for statement context \"parent\"  when single ContextActivity is passed",
                  "children": []
                },
                {
                  "text": "should return array for statement context \"grouping\"  when single ContextActivity is passed",
                  "children": []
                },
                {
                  "text": "should return array for statement context \"category\"  when single ContextActivity is passed",
                  "children": []
                },
                {
                  "text": "should return array for statement context \"other\"  when single ContextActivity is passed",
                  "children": []
                },
                {
                  "text": "should return array for statement substatement context \"parent\"  when single ContextActivity is passed",
                  "children": []
                },
                {
                  "text": "should return array for statement substatement context \"grouping\"  when single ContextActivity is passed",
                  "children": []
                },
                {
                  "text": "should return array for statement substatement context \"category\"  when single ContextActivity is passed",
                  "children": []
                },
                {
                  "text": "should return array for statement substatement context \"other\"  when single ContextActivity is passed",
                  "children": []
                }
              ]
            }
          ]
        },
        {
          "text": "Timestamp Property Requirements",
          "children": [
            {
              "text": "A \"timestamp\" property is a TimeStamp",
              "children": [
                {
                  "text": "statement \"template\" invalid string",
                  "children": []
                },
                {
                  "text": "statement \"template\" invalid date",
                  "children": []
                },
                {
                  "text": "statement \"template\" future date",
                  "children": []
                },
                {
                  "text": "substatement \"template\" invalid string",
                  "children": []
                },
                {
                  "text": "substatement \"template\" invalid date",
                  "children": []
                },
                {
                  "text": "substatement \"template\" future date",
                  "children": []
                }
              ]
            }
          ]
        },
        {
          "text": "Stored Property Requirements",
          "children": [
            {
              "text": "An LRS MUST accept statements with the stored property",
              "children": [
                {
                  "text": "using POST",
                  "children": []
                },
                {
                  "text": "using PUT",
                  "children": []
                }
              ]
            },
            {
              "text": "A stored property must be a TimeStamp",
              "children": [
                {
                  "text": "retrieve statements, test a stored property",
                  "children": []
                }
              ]
            }
          ]
        },
        {
          "text": "Authority Property Requirements",
          "children": [
            {
              "text": "An LRS rejects with error code 400 Bad Request, a Request whose \"authority\" is a Group and consists of non-O-Auth Agents",
              "children": []
            },
            {
              "text": "An \"authority\" property is an Agent or Group",
              "children": [
                {
                  "text": "should pass statement authority agent template",
                  "children": []
                },
                {
                  "text": "should pass statement authority template",
                  "children": []
                },
                {
                  "text": "should fail statement authority identified group (mbox)",
                  "children": []
                },
                {
                  "text": "should fail statement authority identified group",
                  "children": []
                },
                {
                  "text": "should fail statement authority identified group (openid)",
                  "children": []
                },
                {
                  "text": "should fail statement authority identified group (account)",
                  "children": []
                }
              ]
            },
            {
              "text": "An \"authority\" property which is also a Group contains exactly two Agents",
              "children": [
                {
                  "text": "statement \"authority\" invalid one member",
                  "children": []
                },
                {
                  "text": "statement \"authority\" invalid three member",
                  "children": []
                }
              ]
            },
            {
              "text": "Statement authority shall only be an anonymous group with two members",
              "children": [
                {
                  "text": "statement authority identified group is rejected",
                  "children": []
                },
                {
                  "text": "statement authority anonymous group with two members is accepted",
                  "children": []
                },
                {
                  "text": "statement authority anonymous group without two members is rejected",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS rejects with error code 400 Bad Request, a Request whose \"authority\" is a Group of more than two Agents",
              "children": [
                {
                  "text": "statement \"authority\" invalid three member",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS populates the \"authority\" property if it is not provided in the Statement, based on header information with the Agent corresponding to the user (contained within the header)",
              "children": [
                {
                  "text": "should populate authority ",
                  "children": []
                }
              ]
            }
          ]
        },
        {
          "text": "Version Property Requirements",
          "children": [
            {
              "text": "Statements returned by an LRS MUST retain the version property they are accepted with",
              "children": []
            },
            {
              "text": "An LRS rejects with error code 400 Bad Request, a Request which uses \"version\" and has the value set to anything but \"1.0\" or \"1.0.x\", where x is the semantic versioning number",
              "children": [
                {
                  "text": "statement \"version\" valid 1.0",
                  "children": []
                },
                {
                  "text": "statement \"version\" valid 1.0.9",
                  "children": []
                },
                {
                  "text": "statement \"version\" invalid string",
                  "children": []
                },
                {
                  "text": "statement \"version\" invalid 0.9.9",
                  "children": []
                },
                {
                  "text": "statement \"version\" invalid 1.1.0",
                  "children": []
                }
              ]
            }
          ]
        },
        {
          "text": "Attachments Property Requirements",
          "children": [
            {
              "text": "A Statement's \"attachments\" property is an array of Attachments",
              "children": [
                {
                  "text": "statement \"attachments\" is an array",
                  "children": []
                },
                {
                  "text": "statement \"attachments\" not an array",
                  "children": []
                }
              ]
            },
            {
              "text": "An Attachment is an Object",
              "children": [
                {
                  "text": "statement \"attachment\" invalid numeric",
                  "children": []
                },
                {
                  "text": "statement \"attachment\" invalid string",
                  "children": []
                }
              ]
            },
            {
              "text": "A \"usageType\" property is an IRI",
              "children": [
                {
                  "text": "statement \"usageType\" invalid string",
                  "children": []
                }
              ]
            },
            {
              "text": "A \"contentType\" property is an Internet Media/MIME type",
              "children": [
                {
                  "text": "statement \"contentType\" invalid number",
                  "children": []
                }
              ]
            },
            {
              "text": "A \"length\" property is an Integer",
              "children": [
                {
                  "text": "statement \"length\" invalid string",
                  "children": []
                }
              ]
            },
            {
              "text": "A \"sha2\" property is a String",
              "children": [
                {
                  "text": "statement \"sha2\" invalid string",
                  "children": []
                }
              ]
            },
            {
              "text": "A \"fileUrl\" property is an IRL",
              "children": [
                {
                  "text": "statement \"fileUrl\" invalid string",
                  "children": []
                }
              ]
            },
            {
              "text": "A \"display\" property is a Language Map",
              "children": [
                {
                  "text": "statement attachment \"display\" language map numeric",
                  "children": []
                },
                {
                  "text": "statement attachment \"display\" language map string",
                  "children": []
                },
                {
                  "text": "statement attachment \"description\" language map numeric",
                  "children": []
                },
                {
                  "text": "statement attachment \"description\" language map string",
                  "children": []
                }
              ]
            }
          ]
        },
        {
          "text": "Retrieval of Statements",
          "children": [
            {
              "text": "A \"statements\" property which is too large for a single page will create a container for each additional page",
              "children": []
            },
            {
              "text": "A \"more\" property's referenced container object follows the same rules as the original GET request, originating with a single \"statements\" property and a single \"more\" property",
              "children": []
            },
            {
              "text": "An LRS's Statement API, upon processing a successful GET request, will return a single \"statements\" property and a single \"more\" property.",
              "children": [
                {
                  "text": "will return single statements property and may return",
                  "children": []
                }
              ]
            },
            {
              "text": "A \"statements\" property is an Array of Statements",
              "children": [
                {
                  "text": "should return StatementResult with statements as array using GET without \"statementId\" or \"voidedStatementId\"",
                  "children": []
                }
              ]
            },
            {
              "text": "The \"more\" property is absent or an empty string (no whitespace) if the entire results of the original GET request have been returned.",
              "children": [
                {
                  "text": "should return empty \"more\" property or no \"more\" property when all statements returned",
                  "children": []
                }
              ]
            },
            {
              "text": "If not empty, the \"more\" property's IRL refers to a specific container object corresponding to the next page of results from the orignal GET request",
              "children": [
                {
                  "text": "should return \"more\" which refers to next page of results",
                  "children": []
                }
              ]
            }
          ]
        },
        {
          "text": "Signed Statements",
          "children": [
            {
              "text": "LRS must validate and store statement signatures if they are provided",
              "children": [
                {
                  "text": "A Signed Statement MUST include a JSON web signature, JWS",
                  "children": [
                    {
                      "text": "rejects a signed statement with a malformed signature - bad content type",
                      "children": []
                    },
                    {
                      "text": "rejects a signed statement with a malformed signature - bad JWS",
                      "children": []
                    }
                  ]
                },
                {
                  "text": "The JWS signature MUST have a payload of a valid JSON serialization of the complete Statement before the signature was added.",
                  "children": [
                    {
                      "text": "rejects statement with invalid JSON serialization",
                      "children": []
                    }
                  ]
                },
                {
                  "text": "The JWS signature MUST use an algorithm of \"RS256\", \"RS384\", or \"RS512\".",
                  "children": [
                    {
                      "text": "Accepts signed statement with \"RS256\"",
                      "children": []
                    },
                    {
                      "text": "Accepts signed statement with \"RS384\"",
                      "children": []
                    },
                    {
                      "text": "Accepts signed statement with \"RS512\"",
                      "children": []
                    },
                    {
                      "text": "Rejects signed statement with another algorithm",
                      "children": []
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "text": "Special Data Types and Rules",
          "children": [
            {
              "text": "An Extension is defined as an Object of any \"extensions\" property",
              "children": [
                {
                  "text": "statement activity extensions valid boolean",
                  "children": []
                },
                {
                  "text": "statement activity extensions valid numeric",
                  "children": []
                },
                {
                  "text": "statement activity extensions valid object",
                  "children": []
                },
                {
                  "text": "statement activity extensions valid string",
                  "children": []
                },
                {
                  "text": "statement result extensions valid boolean",
                  "children": []
                },
                {
                  "text": "statement result extensions valid numeric",
                  "children": []
                },
                {
                  "text": "statement result extensions valid object",
                  "children": []
                },
                {
                  "text": "statement result extensions valid string",
                  "children": []
                },
                {
                  "text": "statement context extensions valid boolean",
                  "children": []
                },
                {
                  "text": "statement context extensions valid numeric",
                  "children": []
                },
                {
                  "text": "statement context extensions valid object",
                  "children": []
                },
                {
                  "text": "statement context extensions valid string",
                  "children": []
                },
                {
                  "text": "statement substatement activity extensions valid boolean",
                  "children": []
                },
                {
                  "text": "statement substatement activity extensions valid numeric",
                  "children": []
                },
                {
                  "text": "statement substatement activity extensions valid object",
                  "children": []
                },
                {
                  "text": "statement substatement activity extensions valid string",
                  "children": []
                },
                {
                  "text": "statement substatement result extensions valid boolean",
                  "children": []
                },
                {
                  "text": "statement substatement result extensions valid numeric",
                  "children": []
                },
                {
                  "text": "statement substatement result extensions valid object",
                  "children": []
                },
                {
                  "text": "statement substatement result extensions valid string",
                  "children": []
                },
                {
                  "text": "statement substatement context extensions valid boolean",
                  "children": []
                },
                {
                  "text": "statement substatement context extensions valid numeric",
                  "children": []
                },
                {
                  "text": "statement substatement context extensions valid object",
                  "children": []
                },
                {
                  "text": "statement substatement context extensions valid string",
                  "children": []
                }
              ]
            },
            {
              "text": "An Extension can be null, an empty string, objects with nothing in them when using POST.",
              "children": [
                {
                  "text": "statement activity extensions can be empty object",
                  "children": []
                },
                {
                  "text": "statement activity extension values can be empty string",
                  "children": []
                },
                {
                  "text": "statement activity extension values can be null",
                  "children": []
                },
                {
                  "text": "statement activity extension values can be empty object",
                  "children": []
                },
                {
                  "text": "statement result extensions can be empty object",
                  "children": []
                },
                {
                  "text": "statement result extension values can be empty string",
                  "children": []
                },
                {
                  "text": "statement result extension values can be null",
                  "children": []
                },
                {
                  "text": "statement result extension values can be empty object",
                  "children": []
                },
                {
                  "text": "statement context extensions can be empty object",
                  "children": []
                },
                {
                  "text": "statement context extensions can be empty string",
                  "children": []
                },
                {
                  "text": "statement context extensions can be null",
                  "children": []
                },
                {
                  "text": "statement context extensions can be empty object",
                  "children": []
                },
                {
                  "text": "statement substatement activity extensions can be empty object",
                  "children": []
                },
                {
                  "text": "statement substatement activity extension values can be empty string",
                  "children": []
                },
                {
                  "text": "statement substatement activity extension values can be null",
                  "children": []
                },
                {
                  "text": "statement substatement activity extension values can be empty object",
                  "children": []
                },
                {
                  "text": "statement substatement result extensions can be empty object",
                  "children": []
                },
                {
                  "text": "statement substatement result extensions can be empty string",
                  "children": []
                },
                {
                  "text": "statement substatement result extensions can be null",
                  "children": []
                },
                {
                  "text": "statement substatement result extensions can be empty object",
                  "children": []
                },
                {
                  "text": "statement substatement context extensions can be empty object",
                  "children": []
                },
                {
                  "text": "statement substatement context extensions can be empty string",
                  "children": []
                },
                {
                  "text": "statement substatement context extensions can be null",
                  "children": []
                },
                {
                  "text": "statement substatement context extensions can be empty object",
                  "children": []
                }
              ]
            },
            {
              "text": "An Extension \"key\" is an IRI",
              "children": [
                {
                  "text": "statement activity extensions key is not an IRI",
                  "children": []
                },
                {
                  "text": "statement result extensions key is not an IRI",
                  "children": []
                },
                {
                  "text": "statement context extensions key is not an IRI",
                  "children": []
                },
                {
                  "text": "statement substatement activity extensions key is not an IRI",
                  "children": []
                },
                {
                  "text": "statement substatement result extensions key is not an IRI",
                  "children": []
                },
                {
                  "text": "statement substatement context extensions key is not an IRI",
                  "children": []
                }
              ]
            },
            {
              "text": "An Extension can be null, an empty string, objects with nothing in them when using PUT.",
              "children": [
                {
                  "text": "statement activity extensions can be empty object",
                  "children": []
                },
                {
                  "text": "statement activity extension values can be empty string",
                  "children": []
                },
                {
                  "text": "statement activity extension values can be null",
                  "children": []
                },
                {
                  "text": "statement activity extensions can be empty object",
                  "children": []
                },
                {
                  "text": "statement result extensions can be empty object",
                  "children": []
                },
                {
                  "text": "statement result extension values can be empty string",
                  "children": []
                },
                {
                  "text": "statement result extension values can be null",
                  "children": []
                },
                {
                  "text": "statement result extension values can be empty object",
                  "children": []
                },
                {
                  "text": "statement context extensions can be empty object",
                  "children": []
                },
                {
                  "text": "statement context extension values can be empty string",
                  "children": []
                },
                {
                  "text": "statement context extension values can be null",
                  "children": []
                },
                {
                  "text": "statement context extension values can be empty object",
                  "children": []
                },
                {
                  "text": "statement substatement activity extensions can be empty object",
                  "children": []
                },
                {
                  "text": "statement substatement activity extension values can be empty string",
                  "children": []
                },
                {
                  "text": "statement substatement activity extension values can be null",
                  "children": []
                },
                {
                  "text": "statement substatement activity extension values can be empty object",
                  "children": []
                },
                {
                  "text": "statement substatement result extensions can be empty object",
                  "children": []
                },
                {
                  "text": "statement substatement result extension values can be empty string",
                  "children": []
                },
                {
                  "text": "statement substatement result extension values can be null",
                  "children": []
                },
                {
                  "text": "statement substatement result extension values can be empty object",
                  "children": []
                },
                {
                  "text": "statement substatement context extensions can be empty object",
                  "children": []
                },
                {
                  "text": "statement substatement context extension values can be empty string",
                  "children": []
                },
                {
                  "text": "statement substatement context extension values can be null",
                  "children": []
                },
                {
                  "text": "statement substatement context extension values can be empty object",
                  "children": []
                }
              ]
            },
            {
              "text": "A Language Map follows RFC5646",
              "children": [
                {
                  "text": "statement verb \"display\" language map invalid",
                  "children": []
                },
                {
                  "text": "statement object \"name\" language map invalid",
                  "children": []
                },
                {
                  "text": "statement object \"description\" language map invalid",
                  "children": []
                },
                {
                  "text": "statement attachment \"display\" language map invalid",
                  "children": []
                },
                {
                  "text": "statement attachment \"description\" language map invalid",
                  "children": []
                },
                {
                  "text": "statement substatement verb \"display\" language map invalid",
                  "children": []
                },
                {
                  "text": "statement substatement activity \"name\" language map invalid",
                  "children": []
                },
                {
                  "text": "statement substatement activity \"description\" language map invalid",
                  "children": []
                }
              ]
            },
            {
              "text": "A TimeStamp is defined as a Date/Time formatted according to ISO 8601",
              "children": [
                {
                  "text": "statement \"template\" invalid string in timestamp",
                  "children": []
                },
                {
                  "text": "statement \"template\" invalid date in timestamp",
                  "children": []
                },
                {
                  "text": "statement \"template\" invalid date in timestamp: did not reject statement timestmap with -00 offset",
                  "children": []
                },
                {
                  "text": "statement \"template\" invalid date in timestamp: did not reject statement timestmap with -0000 offset",
                  "children": []
                },
                {
                  "text": "statement \"template\" invalid date in timestamp: did not reject statement timestmap with -00:00 offset",
                  "children": []
                },
                {
                  "text": "substatement \"template\" invalid string in timestamp",
                  "children": []
                },
                {
                  "text": "substatement \"template\" invalid date in timestamp",
                  "children": []
                },
                {
                  "text": "substatement \"template\" invalid date in timestamp: did not reject substatement timestamp with -00 offset",
                  "children": []
                },
                {
                  "text": "substatement \"template\" invalid date in timestamp: did not reject substatement timestamp with  -0000 offset",
                  "children": []
                },
                {
                  "text": "substatement \"template\" invalid date in timestamp: did not reject substatement timestamp with  -00:00 offset",
                  "children": []
                }
              ]
            },
            {
              "text": "A Timestamp MUST preserve precision to at least milliseconds, 3 decimal points beyond seconds.",
              "children": [
                {
                  "text": "retrieve statements, test a timestamp property",
                  "children": []
                },
                {
                  "text": "retrieve statements, test a stored property",
                  "children": []
                }
              ]
            },
            {
              "text": "A Duration MUST be expressed using the format for Duration in ISO 8601:2004(E) section 4.4.3.2.",
              "children": [
                {
                  "text": "statement result \"duration\" property is valid",
                  "children": []
                },
                {
                  "text": "statement substatement result \"duration\" property is valid",
                  "children": []
                },
                {
                  "text": "statement result \"duration\" property is invalid with invalid string",
                  "children": []
                },
                {
                  "text": "statement substatement result \"duration\" property is invalid",
                  "children": []
                },
                {
                  "text": "statement result \"duration\" property is invalid with invalid number",
                  "children": []
                },
                {
                  "text": "statement substatement result \"duration\" property is invalid invalid number",
                  "children": []
                },
                {
                  "text": "statement result \"duration\" property is invalid with invalid object",
                  "children": []
                },
                {
                  "text": "statement substatement result \"duration\" property is invalid with invalid object",
                  "children": []
                },
                {
                  "text": "statement result \"duration\" property is invalid with invalid duration",
                  "children": []
                },
                {
                  "text": "statement substatement result \"duration\" property is invalid with invalid duration",
                  "children": []
                },
                {
                  "text": "statement result \"duration\" property is valid with \"PT4H35M59.14S\"",
                  "children": []
                },
                {
                  "text": "statement substatement result \"duration\" property is valid with \"PT16559.14S\"",
                  "children": []
                },
                {
                  "text": "statement result \"duration\" property is valid with \"P3Y1M29DT4H35M59.14S\"",
                  "children": []
                },
                {
                  "text": "statement substatement result \"duration\" property is valid with \"P3Y\"",
                  "children": []
                },
                {
                  "text": "statement result \"duration\" property is valid with \"P4W\"",
                  "children": []
                },
                {
                  "text": "statement result \"duration\" property is invalid with \"P4W1D\"",
                  "children": []
                }
              ]
            }
          ]
        },
        {
          "text": "HEAD Request Implementation Requirements",
          "children": [
            {
              "text": "An LRS accepts HEAD requests without Content-Length headers",
              "children": []
            },
            {
              "text": "An LRS accepts GET requests without Content-Length headers",
              "children": []
            },
            {
              "text": "An LRS accepts HEAD requests",
              "children": [
                {
                  "text": "should succeed HEAD activities with no body",
                  "children": []
                },
                {
                  "text": "should succeed HEAD activities profile with no body",
                  "children": []
                },
                {
                  "text": "should succeed HEAD activities state with no body",
                  "children": []
                },
                {
                  "text": "should succeed HEAD agents with no body",
                  "children": []
                },
                {
                  "text": "should succeed HEAD agents profile with no body",
                  "children": []
                },
                {
                  "text": "should succeed HEAD statements with no body",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS responds to a HEAD request in the same way as a GET request, but without the message-body",
              "children": [
                {
                  "text": "should succeed HEAD activities with no body",
                  "children": []
                },
                {
                  "text": "should succeed HEAD activities profile with no body",
                  "children": []
                },
                {
                  "text": "should succeed HEAD activities state with no body",
                  "children": []
                },
                {
                  "text": "should succeed HEAD agents with no body",
                  "children": []
                },
                {
                  "text": "should succeed HEAD agents profile with no body",
                  "children": []
                },
                {
                  "text": "should succeed HEAD statements with no body",
                  "children": []
                }
              ]
            }
          ]
        },
        {
          "text": "Alternate Request Syntax Requirements",
          "children": [
            {
              "text": "The LRS MUST support the Alternate Request Syntax",
              "children": [
                {
                  "text": "An LRS accepts a valid POST request containing a GET request returning 200 OK and the StatementResult Object.",
                  "children": []
                },
                {
                  "text": "An LRS rejects an alternate request syntax not issued as a POST",
                  "children": []
                },
                {
                  "text": "An LRS accepts an alternate request syntax PUT issued as a POST",
                  "children": []
                },
                {
                  "text": "During an alternate request syntax the LRS treats the listed form parameters, 'Authorization', 'X-Experience-API-Version', 'Content-Type', 'Content-Length', 'If-Match' and 'If-None-Match', as header parameters",
                  "children": []
                },
                {
                  "text": "An LRS will reject an alternate request syntax which contains any extra information with error code 400 Bad Request",
                  "children": []
                },
                {
                  "text": "An LRS will reject an alternate request syntax sending content which does not have a form parameter with the name of \"content\"",
                  "children": [
                    {
                      "text": "will pass PUT with content body which is url encoded",
                      "children": []
                    },
                    {
                      "text": "will fail PUT with no content body",
                      "children": []
                    },
                    {
                      "text": "will fail PUT with content body which is not url encoded",
                      "children": []
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "text": "Encoding Requirements",
          "children": [
            {
              "text": "All Strings are encoded and interpreted as UTF-8",
              "children": []
            }
          ]
        },
        {
          "text": "Content Type Requirements",
          "children": [
            {
              "text": "An LRS rejects with error code 400 Bad Request, a PUT or POST Request which uses Attachments, has a \"Content Type\" header with value \"multipart/mixed\", and for any part except the first does not have a Header named \"Content-Transfer-Encoding\" with a value of \"binary\"",
              "children": []
            },
            {
              "text": "An LRS rejects with error code 400 Bad Request, a Request which uses Attachments and does not have a \"Content-Type\" header with value \"application/json\" or \"multipart/mixed\"",
              "children": [
                {
                  "text": "should succeed when attachment uses \"fileUrl\" and request content-type is \"application/json\"",
                  "children": []
                },
                {
                  "text": "should fail when attachment uses \"fileUrl\" and request content-type is \"multipart/form-data\"",
                  "children": []
                },
                {
                  "text": "should succeed when attachment is raw data and request content-type is \"multipart/mixed\"",
                  "children": []
                },
                {
                  "text": "should fail when attachment is raw data and request content-type is \"multipart/form-data\"",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS rejects with error code 400 Bad Request, a PUT or POST Request which has excess multi-part sections that are not attachments.",
              "children": [
                {
                  "text": "should fail when passing statement attachments with excess multipart sections",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS rejects with error code 400 Bad Request, a PUT or POST Request which uses Attachments, has a \"Content-Type\" header with value \"application/json\", and has a discrepancy in the number of Attachments vs. the number of fileURL members",
              "children": [
                {
                  "text": "should fail when passing statement attachments and missing attachment\"s binary",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS rejects with error code 400 Bad Request, a PUT or POST Request which uses Attachments, has a \"Content Type\" header with value \"multipart/mixed\", and does not have a body header named \"boundary\"",
              "children": [
                {
                  "text": "should fail if boundary not provided in body",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS rejects with error code 400 Bad Request, a PUT or POST Request which uses Attachments, has a \"Content Type\" header with value \"multipart/mixed\", and does not have a Boundary before each \"Content-Type\" header",
              "children": [
                {
                  "text": "should fail if boundary not provided in body",
                  "children": []
                },
                {
                  "text": "should fail if boundary not provided in header",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS rejects with error code 400 Bad Request, a PUT or POST Request which uses Attachments, has a \"Content Type\" header with value \"multipart/mixed\", and does not the first document part with a \"Content-Type\" header with a value of \"application/json\"",
              "children": [
                {
                  "text": "should fail when attachment is raw data and first part content type is not \"application/json\"",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS rejects with error code 400 Bad Request, a PUT or POST Request which uses Attachments, has a \"Content Type\" header with value \"multipart/mixed\", and does not have all of the Statements in the first document part",
              "children": [
                {
                  "text": "should fail when statements separated into multiple parts",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS rejects with error code 400 Bad Request, a PUT or POST Request which uses Attachments, has a \"Content Type\" header with value \"multipart/mixed\", and for any part except the first does not have a Header named \"X-Experience-API-Hash\" with a value of one of those found in a \"sha2\" property of a Statement in the first part of this document",
              "children": [
                {
                  "text": "should fail when attachments missing header \"X-Experience-API-Hash\"",
                  "children": []
                },
                {
                  "text": "should fail when attachments header \"X-Experience-API-Hash\" does not match \"sha2\"",
                  "children": []
                }
              ]
            }
          ]
        },
        {
          "text": "Statement Resource Requirements",
          "children": [
            {
              "text": "An LRS has a Statement Resource with endpoint \"base IRI\"+\"/statements\"",
              "children": [
                {
                  "text": "should allow \"/statements\" POST",
                  "children": []
                },
                {
                  "text": "should allow \"/statements\" PUT",
                  "children": []
                },
                {
                  "text": "should allow \"/statements\" GET",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS's Statement Resource upon processing a successful PUT request returns code 204 No Content",
              "children": [
                {
                  "text": "should persist statement and return status 204",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS's Statement Resource accepts PUT requests only if it contains a \"statementId\" parameter",
              "children": [
                {
                  "text": "should persist statement using \"statementId\" parameter",
                  "children": []
                },
                {
                  "text": "should fail without using \"statementId\" parameter",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS cannot modify a Statement, state, or Object in the event it receives a Statement with statementID equal to a Statement in the LRS already.",
              "children": [
                {
                  "text": "should not update statement with matching \"statementId\" on PUT",
                  "children": []
                },
                {
                  "text": "should not update statement with matching \"statementId\" on POST",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS's Statement Resource accepts POST requests",
              "children": [
                {
                  "text": "should persist statement using \"POST\"",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS's Statement Resource upon processing a successful POST request returns code 200 OK and all Statement UUIDs within the POST **Implicit**",
              "children": [
                {
                  "text": "should persist statement using \"POST\" and return array of IDs",
                  "children": []
                }
              ]
            },
            {
              "text": "LRS's Statement Resource accepts GET requests",
              "children": [
                {
                  "text": "should return using GET",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS's Statement Resource upon processing a successful GET request with a \"statementId\" parameter, returns code 200 OK and a single Statement with the corresponding \"id\".",
              "children": [
                {
                  "text": "should retrieve statement using \"statementId\"",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS's Statement Resource upon processing a successful GET request with a \"voidedStatementId\" parameter, returns code 200 OK and a single Statement with the corresponding \"id\".",
              "children": [
                {
                  "text": "should return a voided statement when using GET \"voidedStatementId\"",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS's Statement Resource upon processing a successful GET request with neither a \"statementId\" nor a \"voidedStatementId\" parameter, returns code 200 OK and a StatementResult Object.",
              "children": [
                {
                  "text": "should return StatementResult using GET without \"statementId\" or \"voidedStatementId\"",
                  "children": []
                },
                {
                  "text": "should return StatementResult using GET with \"agent\"",
                  "children": []
                },
                {
                  "text": "should return StatementResult using GET with \"verb\"",
                  "children": []
                },
                {
                  "text": "should return StatementResult using GET with \"activity\"",
                  "children": []
                },
                {
                  "text": "should return StatementResult using GET with \"registration\"",
                  "children": []
                },
                {
                  "text": "should return StatementResult using GET with \"related_activities\"",
                  "children": []
                },
                {
                  "text": "should return StatementResult using GET with \"related_agents\"",
                  "children": []
                },
                {
                  "text": "should return StatementResult using GET with \"since\"",
                  "children": []
                },
                {
                  "text": "should return StatementResult using GET with \"until\"",
                  "children": []
                },
                {
                  "text": "should return StatementResult using GET with \"limit\"",
                  "children": []
                },
                {
                  "text": "should return StatementResult using GET with \"ascending\"",
                  "children": []
                },
                {
                  "text": "should return StatementResult using GET with \"format\"",
                  "children": []
                },
                {
                  "text": "should return multipart response format StatementResult using GET with \"attachments\" parameter as true",
                  "children": []
                },
                {
                  "text": "should not return multipart response format using GET with \"attachments\" parameter as false",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS's Statement Resource can process a GET request with \"statementId\" as a parameter",
              "children": [
                {
                  "text": "should process using GET with \"statementId\"",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS's Statement Resource can process a GET request with \"voidedStatementId\" as a parameter",
              "children": [
                {
                  "text": "should process using GET with \"voidedStatementId\"",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS's Statement Resource can process a GET request with \"agent\" as a parameter",
              "children": [
                {
                  "text": "should process using GET with \"agent\"",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS's Statement Resource can process a GET request with \"verb\" as a parameter",
              "children": [
                {
                  "text": "should process using GET with \"verb\"",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS's Statement Resource can process a GET request with \"activity\" as a parameter",
              "children": [
                {
                  "text": "should process using GET with \"activity\"",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS's Statement Resource can process a GET request with \"registration\" as a parameter",
              "children": [
                {
                  "text": "should process using GET with \"registration\"",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS's Statement Resource can process a GET request with \"related_activities\" as a parameter",
              "children": [
                {
                  "text": "should process using GET with \"related_activities\"",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS's Statement Resource can process a GET request with \"related_agents\" as a parameter",
              "children": [
                {
                  "text": "should process using GET with \"related_agents\"",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS's Statement Resource can process a GET request with \"since\" as a parameter",
              "children": [
                {
                  "text": "should process using GET with \"since\"",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS's Statement Resource can process a GET request with \"until\" as a parameter",
              "children": [
                {
                  "text": "should process using GET with \"until\"",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS's Statement Resource can process a GET request with \"limit\" as a parameter",
              "children": [
                {
                  "text": "should process using GET with \"limit\"",
                  "children": []
                }
              ]
            },
            {
              "text": "If the \"Accept-Language\" header is present as part of the GET request to the Statement API and the \"format\" parameter is set to \"canonical\", the LRS MUST apply this data to choose the matching language in the response.",
              "children": [
                {
                  "text": "should apply this data to choose the matching language in the response",
                  "children": []
                },
                {
                  "text": "should NOT apply this data to choose the matching language in the response when format is not set ",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS's Statement Resource can process a GET request with \"format\" as a parameter",
              "children": [
                {
                  "text": "should process using GET with \"format\" absent",
                  "children": []
                },
                {
                  "text": "should process using GET with \"format\" canonical",
                  "children": []
                },
                {
                  "text": "should process using GET with \"format\" exact",
                  "children": []
                },
                {
                  "text": "should process using GET with \"format\" ids",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS's Statement Resource can process a GET request with \"attachments\" as a parameter",
              "children": [
                {
                  "text": "should process using GET with \"attachments\"",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRSs Statement Resource, upon receiving a GET request, MUST have a \"Content-Type\" header",
              "children": [
                {
                  "text": "should contain the content-type header",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS's Statement Resource can process a GET request with \"ascending\" as a parameter",
              "children": [
                {
                  "text": "should process using GET with \"ascending\"",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS's Statement Resource rejects with error code 400 a GET request with both \"statementId\" and anything other than \"attachments\" or \"format\" as parameters",
              "children": [
                {
                  "text": "should fail when using \"statementId\" with \"agent\"",
                  "children": []
                },
                {
                  "text": "should fail when using \"statementId\" with \"verb\"",
                  "children": []
                },
                {
                  "text": "should fail when using \"statementId\" with \"activity\"",
                  "children": []
                },
                {
                  "text": "should fail when using \"statementId\" with \"registration\"",
                  "children": []
                },
                {
                  "text": "should fail when using \"statementId\" with \"related_activities\"",
                  "children": []
                },
                {
                  "text": "should fail when using \"statementId\" with \"related_agents\"",
                  "children": []
                },
                {
                  "text": "should fail when using \"statementId\" with \"since\"",
                  "children": []
                },
                {
                  "text": "should fail when using \"statementId\" with \"until\"",
                  "children": []
                },
                {
                  "text": "should fail when using \"statementId\" with \"limit\"",
                  "children": []
                },
                {
                  "text": "should fail when using \"statementId\" with \"ascending\"",
                  "children": []
                },
                {
                  "text": "should pass when using \"statementId\" with \"format\"",
                  "children": []
                },
                {
                  "text": "should pass when using \"statementId\" with \"attachments\"",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS's Statement Resource rejects with error code 400 a GET request with both \"voidedStatementId\" and anything other than \"attachments\" or \"format\" as parameters",
              "children": [
                {
                  "text": "should fail when using \"voidedStatementId\" with \"agent\"",
                  "children": []
                },
                {
                  "text": "should fail when using \"voidedStatementId\" with \"verb\"",
                  "children": []
                },
                {
                  "text": "should fail when using \"voidedStatementId\" with \"activity\"",
                  "children": []
                },
                {
                  "text": "should fail when using \"voidedStatementId\" with \"registration\"",
                  "children": []
                },
                {
                  "text": "should fail when using \"voidedStatementId\" with \"related_activities\"",
                  "children": []
                },
                {
                  "text": "should fail when using \"voidedStatementId\" with \"related_agents\"",
                  "children": []
                },
                {
                  "text": "should fail when using \"voidedStatementId\" with \"since\"",
                  "children": []
                },
                {
                  "text": "should fail when using \"voidedStatementId\" with \"until\"",
                  "children": []
                },
                {
                  "text": "should fail when using \"voidedStatementId\" with \"limit\"",
                  "children": []
                },
                {
                  "text": "should fail when using \"voidedStatementId\" with \"ascending\"",
                  "children": []
                },
                {
                  "text": "should pass when using \"voidedStatementId\" with \"format\"",
                  "children": []
                },
                {
                  "text": "should pass when using \"voidedStatementId\" with \"attachments\"",
                  "children": []
                }
              ]
            },
            {
              "text": "The LRS will NOT reject a GET request which returns an empty \"statements\" property",
              "children": [
                {
                  "text": "should return empty array list",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS's Statement Resource upon processing a GET request, returns a header with name \"X-Experience-API-Consistent-Through\" regardless of the code returned.",
              "children": [
                {
                  "text": "should return \"X-Experience-API-Consistent-Through\" using GET",
                  "children": []
                },
                {
                  "text": "should return \"X-Experience-API-Consistent-Through\" misusing GET",
                  "children": []
                },
                {
                  "text": "should return \"X-Experience-API-Consistent-Through\" using GET with \"agent\"",
                  "children": []
                },
                {
                  "text": "should return \"X-Experience-API-Consistent-Through\" using GET with \"verb\"",
                  "children": []
                },
                {
                  "text": "should return \"X-Experience-API-Consistent-Through\" using GET with \"activity\"",
                  "children": []
                },
                {
                  "text": "should return \"X-Experience-API-Consistent-Through\" using GET with \"registration\"",
                  "children": []
                },
                {
                  "text": "should return \"X-Experience-API-Consistent-Through\" using GET with \"related_activities\"",
                  "children": []
                },
                {
                  "text": "should return \"X-Experience-API-Consistent-Through\" using GET with \"related_agents\"",
                  "children": []
                },
                {
                  "text": "should return \"X-Experience-API-Consistent-Through\" using GET with \"since\"",
                  "children": []
                },
                {
                  "text": "should return \"X-Experience-API-Consistent-Through\" using GET with \"until\"",
                  "children": []
                },
                {
                  "text": "should return \"X-Experience-API-Consistent-Through\" using GET with \"limit\"",
                  "children": []
                },
                {
                  "text": "should return \"X-Experience-API-Consistent-Through\" using GET with \"ascending\"",
                  "children": []
                },
                {
                  "text": "should return \"X-Experience-API-Consistent-Through\" using GET with \"format\"",
                  "children": []
                },
                {
                  "text": "should return \"X-Experience-API-Consistent-Through\" using GET with \"attachments\"",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS's \"X-Experience-API-Consistent-Through\" header is an ISO 8601 combined date and time",
              "children": [
                {
                  "text": "should return valid \"X-Experience-API-Consistent-Through\" using GET",
                  "children": []
                },
                {
                  "text": "should return \"X-Experience-API-Consistent-Through\" using GET with \"agent\"",
                  "children": []
                },
                {
                  "text": "should return \"X-Experience-API-Consistent-Through\" using GET with \"verb\"",
                  "children": []
                },
                {
                  "text": "should return \"X-Experience-API-Consistent-Through\" using GET with \"activity\"",
                  "children": []
                },
                {
                  "text": "should return \"X-Experience-API-Consistent-Through\" using GET with \"registration\"",
                  "children": []
                },
                {
                  "text": "should return \"X-Experience-API-Consistent-Through\" using GET with \"related_activities\"",
                  "children": []
                },
                {
                  "text": "should return \"X-Experience-API-Consistent-Through\" using GET with \"related_agents\"",
                  "children": []
                },
                {
                  "text": "should return \"X-Experience-API-Consistent-Through\" using GET with \"since\"",
                  "children": []
                },
                {
                  "text": "should return \"X-Experience-API-Consistent-Through\" using GET with \"until\"",
                  "children": []
                },
                {
                  "text": "should return \"X-Experience-API-Consistent-Through\" using GET with \"limit\"",
                  "children": []
                },
                {
                  "text": "should return \"X-Experience-API-Consistent-Through\" using GET with \"ascending\"",
                  "children": []
                },
                {
                  "text": "should return \"X-Experience-API-Consistent-Through\" using GET with \"format\"",
                  "children": []
                },
                {
                  "text": "should return \"X-Experience-API-Consistent-Through\" using GET with \"attachments\"",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRSs Statement Resource does not return attachment data and only returns application/json if the \"attachment\" parameter set to \"false\"",
              "children": [
                {
                  "text": "should NOT return the attachment if \"attachments\" is missing",
                  "children": []
                },
                {
                  "text": "should NOT return the attachment if \"attachments\" is false",
                  "children": []
                },
                {
                  "text": "should return the attachment when \"attachment\" is true",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS's Statement Resource, upon processing a successful GET request, can only return a Voided Statement if that Statement is specified in the voidedStatementId parameter of that request",
              "children": [
                {
                  "text": "should not return a voided statement if using GET \"statementId\"",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS's Statement Resource, upon processing a successful GET request wishing to return a Voided Statement still returns Statements which target it",
              "children": [
                {
                  "text": "should only return statements stored after designated \"since\" timestamp when using \"since\" parameter",
                  "children": []
                },
                {
                  "text": "should only return statements stored at or before designated \"before\" timestamp when using \"until\" parameter",
                  "children": []
                },
                {
                  "text": "should return the number of statements listed in \"limit\" parameter",
                  "children": []
                },
                {
                  "text": "should return StatementRef and voiding statement when not using \"since\", \"until\", \"limit\"",
                  "children": []
                }
              ]
            },
            {
              "text": "The Statements within the \"statements\" property will correspond to the filtering criterion sent in with the GET request",
              "children": [
                {
                  "text": "should return StatementResult with statements as array using GET with \"agent\"",
                  "children": []
                },
                {
                  "text": "should return StatementResult with statements as array using GET with \"verb\"",
                  "children": []
                },
                {
                  "text": "should return StatementResult with statements as array using GET with \"activity\"",
                  "children": []
                },
                {
                  "text": "should return StatementResult with statements as array using GET with \"registration\"",
                  "children": []
                },
                {
                  "text": "should return StatementResult with statements as array using GET with \"related_activities\"",
                  "children": []
                },
                {
                  "text": "should return StatementResult with statements as array using GET with \"related_agents\"",
                  "children": []
                },
                {
                  "text": "should return StatementResult with statements as array using GET with \"since\"",
                  "children": []
                },
                {
                  "text": "should return StatementResult with statements as array using GET with \"until\"",
                  "children": []
                },
                {
                  "text": "should return StatementResult with statements as array using GET with \"limit\"",
                  "children": []
                },
                {
                  "text": "should return StatementResult with statements as array using GET with \"ascending\"",
                  "children": []
                },
                {
                  "text": "should return StatementResult with statements as array using GET with \"format\"",
                  "children": []
                },
                {
                  "text": "should return StatementResult with statements as array using GET with \"attachments\"",
                  "children": []
                }
              ]
            }
          ]
        },
        {
          "text": "Document Resource Requirements",
          "children": [
            {
              "text": "An LRS makes no modifications to stored data for any rejected request",
              "children": []
            },
            {
              "text": "A Document Merge overwrites any duplicate Objects from the previous document with the new document.",
              "children": []
            },
            {
              "text": "A Document Merge only performs overwrites at one level deep, although the entire object is replaced.",
              "children": []
            }
          ]
        },
        {
          "text": "State Resource Requirements",
          "children": [
            {
              "text": "An LRS has a State Resource with endpoint \"base IRI\"+\"/activities/state\"",
              "children": []
            },
            {
              "text": "An LRS's State Resource accepts PUT requests",
              "children": []
            },
            {
              "text": "An LRS's State Resource accepts POST requests",
              "children": []
            },
            {
              "text": "An LRS's State Resource accepts GET requests",
              "children": []
            },
            {
              "text": "An LRS's State Resource accepts DELETE requests",
              "children": []
            },
            {
              "text": "An LRS's State Resource upon processing a successful GET request with a valid \"stateId\" as a parameter returns the document satisfying the requirements of the GET and code 200 OK",
              "children": []
            },
            {
              "text": "An LRS's State Resource upon processing a successful DELETE request with a valid \"stateId\" as a parameter deletes the document satisfying the requirements of the DELETE and returns code 204 No Content",
              "children": []
            },
            {
              "text": "An LRS's State Resource rejects a PUT request without \"activityId\" as a parameter with error code 400 Bad Request",
              "children": []
            },
            {
              "text": "An LRS's State Resource rejects a POST request without \"activityId\" as a parameter with error code 400 Bad Request",
              "children": []
            },
            {
              "text": "An LRS's State Resource rejects a GET request without \"activityId\" as a parameter with error code 400 Bad Request",
              "children": []
            },
            {
              "text": "An LRS's State Resource rejects a DELETE request without \"activityId\" as a parameter with error code 400 Bad Request",
              "children": []
            },
            {
              "text": "An LRS's State Resource rejects a PUT request without \"agent\" as a parameter with error code 400 Bad Request",
              "children": []
            },
            {
              "text": "An LRS's State Resource rejects a PUT request with \"agent\" as a parameter if it is not in JSON format with error code 400 Bad Request",
              "children": []
            },
            {
              "text": "An LRS's State Resource rejects a POST request without \"agent\" as a parameter with error code 400 Bad Request",
              "children": []
            },
            {
              "text": "An LRS's State Resource rejects a GET request without \"agent\" as a parameter with error code 400 Bad Request",
              "children": []
            },
            {
              "text": "An LRS's State Resource rejects a DELETE request without \"agent\" as a parameter with error code 400 Bad Request",
              "children": []
            },
            {
              "text": "An LRS's State Resource can process a PUT request with \"registration\" as a parameter",
              "children": []
            },
            {
              "text": "An LRS's State Resource, rejects a POST request if the document is found and either document's type is not \"application/json\" with error code 400 Bad Request",
              "children": []
            },
            {
              "text": "An LRS's State Resource, upon receiving a POST request for a document not currently in the LRS, treats it as a PUT request and store a new document",
              "children": []
            },
            {
              "text": "An LRS's State Resource performs a Document Merge if a document is found and both it and the document in the POST request have type \"application/json\"",
              "children": []
            },
            {
              "text": "An LRS must reject with 400 Bad Request a POST request to the State Resource which contains name/value pairs with invalid JSON and the Content-Type header is 'application/json'",
              "children": []
            },
            {
              "text": "An LRS's State Resource can process a POST request with \"registration\" as a parameter",
              "children": []
            },
            {
              "text": "An LRS's State Resource can process a GET request with \"registration\" as a parameter",
              "children": []
            },
            {
              "text": "An LRS's State Resource can process a DELETE request with \"registration\" as a parameter",
              "children": []
            },
            {
              "text": "An LRS's State Resource rejects a PUT request without \"stateId\" as a parameter with error code 400 Bad Request",
              "children": []
            },
            {
              "text": "An LRS's State Resource rejects a POST request without \"stateId\" as a parameter with error code 400 Bad Request",
              "children": []
            },
            {
              "text": "An LRS's State Resource can process a GET request with \"stateId\" as a parameter",
              "children": []
            },
            {
              "text": "An LRS's State Resource can process a GET request with \"since\" as a parameter",
              "children": []
            },
            {
              "text": "An LRS's State Resource rejects a GET request with \"since\" as a parameter if it is not a \"TimeStamp\", with error code 400 Bad Request",
              "children": []
            },
            {
              "text": "An LRS's State Resource can process a DELETE request with \"stateId\" as a parameter",
              "children": []
            },
            {
              "text": "An LRS's State Resource upon processing a successful GET request without \"stateId\" as a parameter returns an array of ids of state data documents satisfying the requirements of the GET and code 200 OK",
              "children": []
            },
            {
              "text": "An LRS's returned array of ids from a successful GET request to the State Resource all refer to documents stored after the TimeStamp in the \"since\" parameter of the GET request",
              "children": []
            },
            {
              "text": "An LRS's State Resource upon processing a successful DELETE request without \"stateId\" as a parameter deletes documents satisfying the requirements of the DELETE and code 204 No Content",
              "children": []
            },
            {
              "text": "An LRS's State Resource rejects a POST request with \"agent\" as a parameter if it is not in JSON format with error code 400 Bad Request",
              "children": [
                {
                  "text": "Should reject POST State with agent invalid value",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS's State Resource rejects a GET request with \"agent\" as a parameter if it is not in JSON format with error code 400 Bad Request",
              "children": [
                {
                  "text": "Should reject GET with \"agent\" with invalid value",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS's State Resource rejects a DELETE request with \"agent\" as a parameter if it is not in JSON format with error code 400 Bad Request",
              "children": [
                {
                  "text": "Should reject DELETE with \"agent\" with invalid value",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS's State Resource rejects a PUT request with \"registration\" as a parameter if it is not a UUID with error code 400 Bad Request",
              "children": [
                {
                  "text": "Should reject PUT with \"registration\" with invalid value",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRSs State Resource, rejects a POST request if the document is found and either document is not a valid JSON Object",
              "children": [
                {
                  "text": "If the document being posted to the State Resource does not have a Content-Type of application/json and the existing document does, the LRS MUST respond with HTTP status code 400 Bad Request, and MUST NOT update the target document as a result of the request.",
                  "children": []
                },
                {
                  "text": "If the existing document does not have a Content-Type of application/json but the document being posted to the State Resource does the LRS MUST respond with HTTP status code 400 Bad Request, and MUST NOT update the target document as a result of the request.",
                  "children": []
                },
                {
                  "text": "If the document being posted to the State Resource has a content type of Content-Type of application/json but cannot be parsed as a JSON Object, the LRS MUST respond with HTTP status code 400 Bad Request, and MUST NOT update the target document as a result of the request.",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS's State Resource rejects a POST request with \"registration\" as a parameter if it is not a UUID with error code 400 Bad Request",
              "children": [
                {
                  "text": "Should reject POST with \"registration\" with invalid value",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS's State Resource rejects a GET request with \"registration\" as a parameter if it is not a UUID with error code 400 Bad Request",
              "children": [
                {
                  "text": "Should reject GET with \"registration\" with invalid value",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS's State Resource rejects a DELETE request with \"registration\" as a parameter if it is not a UUID with error code 400 Bad Request",
              "children": [
                {
                  "text": "Should reject DELETE with \"registration\" with invalid value",
                  "children": []
                }
              ]
            }
          ]
        },
        {
          "text": "Agents Resource Requirements",
          "children": [
            {
              "text": "An LRS has an Agents Resource with endpoint \"base IRI\" + /agents\"",
              "children": []
            },
            {
              "text": "An LRS's Agents Resource accepts GET requests",
              "children": []
            },
            {
              "text": "An LRS's Agent Resource upon processing a successful GET request returns a Person Object if the \"agent\" parameter can be found in the LRS and code 200 OK",
              "children": []
            },
            {
              "text": "An LRS's Agents Resource rejects a GET request without \"agent\" as a parameter with error code 400 Bad Request",
              "children": []
            },
            {
              "text": "A Person Object's \"objectType\" property is a String and is \"Person\"",
              "children": []
            },
            {
              "text": "A Person Object's \"name\" property is an Array of Strings",
              "children": []
            },
            {
              "text": "A Person Object's \"mbox\" property is an Array of IRIs",
              "children": []
            },
            {
              "text": "A Person Object's \"mbox\" entries have the form \"mailto:emailaddress\"",
              "children": []
            },
            {
              "text": "A Person Object's \"mbox_sha1sum\" property is an Array of Strings",
              "children": []
            },
            {
              "text": "A Person Object's \"openid\" property is an Array of Strings",
              "children": []
            },
            {
              "text": "A Person Object's \"account\" property is an Array of Account Objects",
              "children": []
            },
            {
              "text": "An LRSs Agents Resource rejects a GET request with \"agent\" as a parameter if it is not a valid, in structure, Agent with error code 400 Bad Request",
              "children": []
            }
          ]
        },
        {
          "text": "Activities Resource Requirements",
          "children": [
            {
              "text": "An LRS has an Activities Resource with endpoint \"base IRI\" + /activities\"",
              "children": []
            },
            {
              "text": "An LRS's Activities Resource accepts GET requests",
              "children": []
            },
            {
              "text": "An LRS's Activities Resource upon processing a successful GET request returns the complete Activity Object",
              "children": []
            },
            {
              "text": "An LRS's Activities Resource rejects a GET request without \"activityId\" as a parameter with error code 400 Bad Request",
              "children": []
            },
            {
              "text": "An LRS's Activities Resource rejects a GET request with \"activityId\" as a parameter if it is not type \"String\" with error code 400 Bad Request",
              "children": []
            },
            {
              "text": "The Activity Object must contain all available information about an activity from any statements who target the same \"activityId\". For example, LRS accepts two statements each with a different language description of an activity using the exact same \"activityId\". The LRS must return both language descriptions when a GET request is made to the Activities endpoint for that \"activityId\"",
              "children": []
            }
          ]
        },
        {
          "text": "Agent Profile Resource Requirements",
          "children": [
            {
              "text": "An LRS's Agent Profile Resource upon processing a successful GET request with a valid \"profileId\" as a parameter returns the document satisfying the requirements of the GET and code 200 OK",
              "children": []
            },
            {
              "text": "An LRS's Agent Profile Resource rejects a PUT request without \"agent\" as a parameter with error code 400 Bad Request",
              "children": []
            },
            {
              "text": "An LRS's Agent Profile Resource rejects a POST request without \"agent\" as a parameter with error code 400 Bad Request",
              "children": []
            },
            {
              "text": "An LRS's Agent Profile Resource rejects a POST request with \"agent\" as a parameter if it is not an Agent Object with error code 400 Bad Request",
              "children": []
            },
            {
              "text": "An LRS's Agent Profile Resource rejects a DELETE request without \"agent\" as a parameter with error code 400 Bad Request",
              "children": []
            },
            {
              "text": "An LRS's Agent Profile Resource rejects a PUT request without \"profileId\" as a parameter with error code 400 Bad Request",
              "children": []
            },
            {
              "text": "An LRS's Agent Profile Resource rejects a POST request without \"profileId\" as a parameter with error code 400 Bad Request",
              "children": []
            },
            {
              "text": "An LRS's Agent Profile Resource rejects a DELETE request without \"profileId\" as a parameter with error code 400 Bad Request",
              "children": []
            },
            {
              "text": "An LRS's Agent Profile Resource upon processing a successful GET request without \"profileId\" as a parameter returns an array of ids of agent profile documents satisfying the requirements of the GET and code 200 OK",
              "children": []
            },
            {
              "text": "An LRS's Agent Profile Resource rejects a GET request without \"agent\" as a parameter with error code 400 Bad Request",
              "children": []
            },
            {
              "text": "An LRS's Agent Profile Resource can process a GET request with \"since\" as a parameter",
              "children": []
            },
            {
              "text": "An LRS's returned array of ids from a successful GET request to the Agent Profile Resource all refer to documents stored after the TimeStamp in the \"since\" parameter of the GET request if such a parameter was present",
              "children": []
            },
            {
              "text": "An LRS's Agent Profile Resource performs a Document Merge if a document is found and both it and the document in the POST request have type \"application/json\"",
              "children": []
            },
            {
              "text": "An LRS's Agent Profile Resource, upon receiving a POST request for a document not currently in the LRS, treats it as a PUT request and store a new document",
              "children": []
            },
            {
              "text": "An LRS's Agent Profile Resource, rejects a POST request if the document is found and either document is not a valid JSON Object",
              "children": []
            },
            {
              "text": "An LRS must reject with 400 Bad Request a POST request to the Activitiy Profile Resource which contains name/value pairs with invalid JSON and the Content-Type header is 'application/json'",
              "children": []
            },
            {
              "text": "An LRS has an Agent Profile Resource with endpoint \"base IRI\"+\"/agents/profile\"",
              "children": [
                {
                  "text": "An LRS's Agent Profile Resource accepts GET requests",
                  "children": []
                },
                {
                  "text": "An LRS's Agent Profile Resource upon processing a successful PUT request returns code 204 No Content",
                  "children": []
                },
                {
                  "text": "An LRS's Agent Profile Resource upon processing a PUT request without an ETag header returns an error code and message",
                  "children": []
                },
                {
                  "text": "An LRS's Agent Profile Resource upon processing a successful POST request returns code 204 No Content",
                  "children": []
                },
                {
                  "text": "An LRS's Agent Profile Resource upon processing a successful DELETE request deletes the associated profile and returns code 204 No Content",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS's Agent Profile Resource rejects a PUT request with \"agent\" as a parameter if it is not an Agent Object with error code 400 Bad Request",
              "children": [
                {
                  "text": "Should reject PUT with \"agent\" with invalid value",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS's Agent Profile Resource rejects a DELETE request with \"agent\" as a parameter if it is not an Agent Object with error code 400 Bad Request",
              "children": [
                {
                  "text": "Should reject DELETE with \"agent\" with invalid value",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS's Agent Profile Resource rejects a GET request with \"agent\" as a parameter if it is a valid, in structure, Agent with error code 400 Bad Request",
              "children": [
                {
                  "text": "Should reject GET with \"agent\" with invalid value",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS's Agent Profile Resource rejects a GET request with \"since\" as a parameter if it is not a \"TimeStamp\", with error code 400 Bad Request",
              "children": [
                {
                  "text": "Should reject GET with \"since\" with invalid value",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRSs Agent Profile Resource, rejects a POST request if the document is found and either documents type is not \"application/json\" with error code 400 Bad Request",
              "children": [
                {
                  "text": "If the document being posted to the Agent Profile Resource does not have a Content-Type of application/json and the existing document does, the LRS MUST respond with HTTP status code 400 Bad Request, and MUST NOT update the target document as a result of the request.",
                  "children": []
                },
                {
                  "text": "If the existing document does not have a Content-Type of application/json but the document being posted to the Agent Profile Resource does the LRS MUST respond with HTTP status code 400 Bad Request, and MUST NOT update the target document as a result of the request.",
                  "children": []
                },
                {
                  "text": "If the document being posted to the Agent Profile Resource has a content type of Content-Type of application/json but cannot be parsed as a JSON Object, the LRS MUST respond with HTTP status code 400 Bad Request, and MUST NOT update the target document as a result of the request.",
                  "children": []
                }
              ]
            }
          ]
        },
        {
          "text": "Activity Profile Resource Requirements",
          "children": [
            {
              "text": "An LRS has an Activity Profile Resource with endpoint \"base IRI\"+\"/activities/profile\"",
              "children": []
            },
            {
              "text": "An LRS's Activity Profile Resource accepts POST requests",
              "children": []
            },
            {
              "text": "An LRS's Activity Profile Resource accepts DELETE requests",
              "children": []
            },
            {
              "text": "An LRS's Activity Profile Resource accepts GET requests",
              "children": []
            },
            {
              "text": "An LRS's Activity Profile Resource upon processing a successful GET request with a valid \"profileId\" as a parameter returns the document satisfying the requirements of the GET and code 200 OK",
              "children": []
            },
            {
              "text": "An LRS's Activity Profile Resource rejects a PUT request without \"activityId\" as a parameter with error code 400 Bad Request",
              "children": []
            },
            {
              "text": "An LRS's Activity Profile Resource rejects a POST request without \"activityId\" as a parameter with error code 400 Bad Request",
              "children": []
            },
            {
              "text": "An LRS's Activity Profile Resource rejects a DELETE request without \"activityId\" as a parameter with error code 400 Bad Request",
              "children": []
            },
            {
              "text": "An LRS's Activity Profile Resource rejects a GET request without \"activityId\" as a parameter with error code 400 Bad Request",
              "children": []
            },
            {
              "text": "An LRS's Activity Profile Resource rejects a PUT request without \"profileId\" as a parameter with error code 400 Bad Request",
              "children": []
            },
            {
              "text": "An LRS's Activity Profile Resource rejects a POST request without \"profileId\" as a parameter with error code 400 Bad Request",
              "children": []
            },
            {
              "text": "An LRS's Activity Profile Resource rejects a DELETE request without \"profileId\" as a parameter with error code 400 Bad Request",
              "children": []
            },
            {
              "text": "An LRS's Activity Profile Resource upon processing a successful GET request without \"profileId\" as a parameter returns an array of ids of activity profile documents satisfying the requirements of the GET and code 200 OK",
              "children": []
            },
            {
              "text": "An LRS's Activity Profile Resource can process a GET request with \"since\" as a parameter",
              "children": []
            },
            {
              "text": "An LRS's returned array of ids from a successful GET request to the Activity Profile Resource all refer to documents stored after the TimeStamp in the \"since\" parameter of the GET request if such a parameter was present",
              "children": []
            },
            {
              "text": "An LRS's Activity Profile Resource, upon receiving a POST request for a document not currently in the LRS, treats it as a PUT request and store a new document",
              "children": []
            },
            {
              "text": "An LRS's Activity Profile Resource performs a Document Merge if a document is found and both it and the document in the POST request have type \"application/json\"",
              "children": []
            },
            {
              "text": "An LRS's Activity Profile Resource, rejects a POST request if the document is found and either document's type is not \"application/json\" with error code 400 Bad Request",
              "children": []
            },
            {
              "text": "An LRS's must reject, with 400 Bad Request, a POST request to the Activity Profile Resource which contains name/value pairs with invalid JSON and the Content-Type header is \"application/json\"",
              "children": []
            },
            {
              "text": "An LRS's Activity Profile Resource accepts PUT requests",
              "children": [
                {
                  "text": "passes with 204 no content",
                  "children": []
                },
                {
                  "text": "fails without ETag header",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS's Activity Profile Resource rejects a GET request with \"since\" as a parameter if it is not a \"TimeStamp\", with error code 400 Bad Request",
              "children": [
                {
                  "text": "Should reject GET with \"since\" with invalid value",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS's Activity Profile Resource, rejects a POST request if the document is found and either document is not a valid JSON Object",
              "children": [
                {
                  "text": "If the document being posted to the Activity Profile Resource does not have a Content-Type of application/json and the existing document does, the LRS MUST respond with HTTP status code 400 Bad Request, and MUST NOT update the target document as a result of the request.",
                  "children": []
                },
                {
                  "text": "If the existing document does not have a Content-Type of application/json but the document being posted to the Activity Profile Resource does the LRS MUST respond with HTTP status code 400 Bad Request, and MUST NOT update the target document as a result of the request.",
                  "children": []
                },
                {
                  "text": "If the document being posted to the Activity Profile Resource has a content type of Content-Type of application/json but cannot be parsed as a JSON Object, the LRS MUST respond with HTTP status code 400 Bad Request, and MUST NOT update the target document as a result of the request.",
                  "children": []
                }
              ]
            }
          ]
        },
        {
          "text": "About Resource Requirements",
          "children": [
            {
              "text": "An LRS has an About Resource with endpoint \"base IRI\"+\"/about\"",
              "children": []
            },
            {
              "text": "An LRS's About Resource upon processing a successful GET request returns a version property and code 200 OK",
              "children": []
            },
            {
              "text": "An LRS's About Resource's version property is an array of strings",
              "children": []
            },
            {
              "text": "An LRS's About Resource's version property contains at least one string of \"1.0.3\"",
              "children": []
            },
            {
              "text": "An LRS's About Resource's version property can only have values of \"0.9\", \"0.95\", \"1.0.0\", or \"\"1.0.\" + X\" with",
              "children": []
            },
            {
              "text": "An LRS rejects with error code 400 Bad Request, a Request which does not use a \"X-Experience-API-Version\" header name to any Resource except the About Resource",
              "children": [
                {
                  "text": "using Statement Endpoint",
                  "children": []
                },
                {
                  "text": "using Activities Endpoint",
                  "children": []
                },
                {
                  "text": "using Activities Profile Endpoint",
                  "children": []
                },
                {
                  "text": "using Activities State Endpoint",
                  "children": []
                },
                {
                  "text": "using Agents Endpoint",
                  "children": []
                },
                {
                  "text": "using Agents Profile Endpoint",
                  "children": []
                }
              ]
            }
          ]
        },
        {
          "text": "Concurrency Requirements",
          "children": [
            {
              "text": "An LRS must support HTTP/1.1 entity tags (ETags) to implement optimistic concurrency control when handling Resources where PUT may overwrite existing data",
              "children": [
                {
                  "text": "When responding to a GET request to Agent Profile resource, include an ETag HTTP header in the response",
                  "children": []
                },
                {
                  "text": "When responding to a GET request to Activities Profile resource, include an ETag HTTP header in the response",
                  "children": []
                },
                {
                  "text": "When returning an ETag header, the value should be calculated as a SHA1 hexadecimal value",
                  "children": []
                },
                {
                  "text": "When responding to a GET Request the Etag header must be enclosed in quotes",
                  "children": []
                },
                {
                  "text": "With a valid etag",
                  "children": []
                },
                {
                  "text": "When responding to a PUT request, handle the If-None-Match header as described in RFC 2616, HTTP/1.1 if it contains \"*\"",
                  "children": [
                    {
                      "text": "succeeds when no document exists",
                      "children": []
                    },
                    {
                      "text": "rejects if a document already exists",
                      "children": []
                    }
                  ]
                },
                {
                  "text": "If Header precondition in PUT Requests for RFC2616 fail",
                  "children": []
                },
                {
                  "text": "If put request is received without either header for a resource that already exists",
                  "children": []
                }
              ]
            }
          ]
        },
        {
          "text": "Error Codes Requirements",
          "children": [
            {
              "text": "An LRS rejects with error code 400 Bad Request any request to an Resource which uses a parameter not recognized by the LRS",
              "children": []
            },
            {
              "text": "An LRS rejects with error code 400 Bad Request any request to an Resource which uses a parameter with differing case",
              "children": [
                {
                  "text": "should fail on PUT statement when not using \"statementId\"",
                  "children": []
                },
                {
                  "text": "should fail on GET statement when not using \"statementId\"",
                  "children": []
                },
                {
                  "text": "should fail on GET statement when not using \"voidedStatementId\"",
                  "children": []
                },
                {
                  "text": "should fail on GET statement when not using \"agent\"",
                  "children": []
                },
                {
                  "text": "should fail on GET statement when not using \"verb\"",
                  "children": []
                },
                {
                  "text": "should fail on GET statement when not using \"activity\"",
                  "children": []
                },
                {
                  "text": "should fail on GET statement when not using \"registration\"",
                  "children": []
                },
                {
                  "text": "should fail on GET statement when not using \"related_activities\"",
                  "children": []
                },
                {
                  "text": "should fail on GET statement when not using \"related_agents\"",
                  "children": []
                },
                {
                  "text": "should fail on GET statement when not using \"since\"",
                  "children": []
                },
                {
                  "text": "should fail on GET statement when not using \"until\"",
                  "children": []
                },
                {
                  "text": "should fail on GET statement when not using \"limit\"",
                  "children": []
                },
                {
                  "text": "should fail on GET statement when not using \"format\"",
                  "children": []
                },
                {
                  "text": "should fail on GET statement when not using \"attachments\"",
                  "children": []
                },
                {
                  "text": "should fail on GET statement when not using \"ascending\"",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS does not process any batch of Statements in which one or more Statements is rejected and if necessary, restores the LRS to the state in which it was before the batch began processing",
              "children": [
                {
                  "text": "should not persist any statements on a single failure",
                  "children": []
                }
              ]
            }
          ]
        },
        {
          "text": "Versioning Requirements",
          "children": [
            {
              "text": "An LRS sends a header response with \"X-Experience-API-Version\" as the name and the latest patch version after \"1.0.0\" as the value",
              "children": []
            },
            {
              "text": "An LRS will not modify Statements based on a \"version\" before \"1.0.1\"",
              "children": [
                {
                  "text": "should not convert newer version format to prior version format",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS rejects with error code 400 Bad Request, a Request which does not use a \"X-Experience-API-Version\" header name to any Resource except the About Resource",
              "children": [
                {
                  "text": "should pass when About GET without header \"X-Experience-API-Version\"",
                  "children": []
                },
                {
                  "text": "should fail when Statement GET without header \"X-Experience-API-Version\"",
                  "children": []
                },
                {
                  "text": "should fail when Statement POST without header \"X-Experience-API-Version\"",
                  "children": []
                },
                {
                  "text": "should fail when Statement PUT without header \"X-Experience-API-Version\"",
                  "children": []
                }
              ]
            }
          ]
        },
        {
          "text": "Authentication Requirements",
          "children": [
            {
              "text": "An LRS must support HTTP Basic Authentication",
              "children": []
            },
            {
              "text": "An LRS rejects a Statement of bad authorization, either authentication needed or failed credentials, with error code 401 Unauthorized",
              "children": [
                {
                  "text": "fails when given a random name pass pair",
                  "children": []
                },
                {
                  "text": "fails with a malformed header",
                  "children": []
                }
              ]
            }
          ]
        }
      ]
    }
  },
  "2.0.0": {
    "conformanceTestCount": 1435,
    "tests": {
      "text": "",
      "children": [
        {
          "text": "Content Type Requirements",
          "children": [
            {
              "text": "An LRS rejects with error code 400 Bad Request, a PUT or POST Request which uses Attachments, has a \"Content Type\" header with value \"multipart/mixed\", and for any part except the first does not have a Header named \"Content-Transfer-Encoding\" with a value of \"binary\"",
              "children": []
            },
            {
              "text": "An LRS rejects with error code 400 Bad Request, a Request which uses Attachments and does not have a \"Content-Type\" header with value \"application/json\" or \"multipart/mixed\"",
              "children": [
                {
                  "text": "should succeed when attachment uses \"fileUrl\" and request content-type is \"application/json\"",
                  "children": []
                },
                {
                  "text": "should succeed when attachment uses \"fileUrl\" and request content-type is \"application/json\"",
                  "children": []
                },
                {
                  "text": "should fail when attachment uses \"fileUrl\" and request content-type is \"multipart/form-data\"",
                  "children": []
                },
                {
                  "text": "should succeed when attachment is raw data and request content-type is \"multipart/mixed\"",
                  "children": []
                },
                {
                  "text": "should fail when attachment is raw data and request content-type is \"multipart/form-data\"",
                  "children": []
                },
                {
                  "text": "should succeed when attachment uses \"fileUrl\" and request content-type is \"multipart/mixed\"",
                  "children": []
                },
                {
                  "text": "should succeed when no attachments are included, but request content-type is \"multipart/mixed\"",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS rejects with error code 400 Bad Request, a PUT or POST Request which has excess multi-part sections that are not attachments.",
              "children": [
                {
                  "text": "should fail when passing statement attachments with excess multipart sections",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS rejects with error code 400 Bad Request, a PUT or POST Request which uses Attachments, has a \"Content-Type\" header with value \"application/json\", and has a discrepancy in the number of Attachments vs. the number of fileURL members",
              "children": [
                {
                  "text": "should fail when passing statement attachments and missing attachment\"s binary",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS rejects with error code 400 Bad Request, a PUT or POST Request which uses Attachments, has a \"Content Type\" header with value \"multipart/mixed\", and does not have a body header named \"boundary\"",
              "children": [
                {
                  "text": "should fail if boundary not provided in body",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS rejects with error code 400 Bad Request, a PUT or POST Request which uses Attachments, has a \"Content Type\" header with value \"multipart/mixed\", and does not have a Boundary before each \"Content-Type\" header",
              "children": [
                {
                  "text": "should fail if boundary not provided in body",
                  "children": []
                },
                {
                  "text": "should fail if boundary not provided in header",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS rejects with error code 400 Bad Request, a PUT or POST Request which uses Attachments, has a \"Content Type\" header with value \"multipart/mixed\", and does not the first document part with a \"Content-Type\" header with a value of \"application/json\"",
              "children": [
                {
                  "text": "should fail when attachment is raw data and first part content type is not \"application/json\"",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS rejects with error code 400 Bad Request, a PUT or POST Request which uses Attachments, has a \"Content Type\" header with value \"multipart/mixed\", and does not have all of the Statements in the first document part",
              "children": [
                {
                  "text": "should fail when statements separated into multiple parts",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS rejects with error code 400 Bad Request, a PUT or POST Request which uses Attachments, has a \"Content Type\" header with value \"multipart/mixed\", and for any part except the first does not have a Header named \"X-Experience-API-Hash\" with a value of one of those found in a \"sha2\" property of a Statement in the first part of this document",
              "children": [
                {
                  "text": "should fail when attachments missing header \"X-Experience-API-Hash\"",
                  "children": []
                },
                {
                  "text": "should fail when attachments header \"X-Experience-API-Hash\" does not match \"sha2\"",
                  "children": []
                }
              ]
            }
          ]
        },
        {
          "text": "",
          "children": [
            {
              "text": "xAPI uses HTTP 1.1 entity tags (ETags) to implement optimistic concurrency control in the following resources, where PUT, POST or DELETE are allowed to overwrite or remove existing data.",
              "children": [
                {
                  "text": "Concurrency for the Activity State Resource.",
                  "children": [
                    {
                      "text": "An LRS responding to a GET request SHALL add an ETag HTTP header to the response.",
                      "children": []
                    },
                    {
                      "text": "When responding to a GET Request the Etag header must be enclosed in quotes",
                      "children": []
                    },
                    {
                      "text": "When responding to a PUT, POST, or DELETE request, must handle the If-Match header as described in RFC 2616, HTTP/1.1 if it contains an ETag",
                      "children": [
                        {
                          "text": "Properly handles PUT requests with If-Match",
                          "children": [
                            {
                              "text": "Should reject a PUT request with a 412 Precondition Failed when using an incorrect ETag",
                              "children": []
                            },
                            {
                              "text": "Should not have modified the document for PUT requests with an incorrect ETag",
                              "children": []
                            },
                            {
                              "text": "Should accept a PUT request with a correct ETag",
                              "children": []
                            },
                            {
                              "text": "Should have modified the document for PUT requests with a correct ETag",
                              "children": []
                            }
                          ]
                        },
                        {
                          "text": "Properly handles POST requests with If-Match",
                          "children": [
                            {
                              "text": "Should reject a POST request with a 412 Precondition Failed when using an incorrect ETag",
                              "children": []
                            },
                            {
                              "text": "Should not have modified the document for POST requests with an incorrect ETag",
                              "children": []
                            },
                            {
                              "text": "Should accept a POST request with a correct ETag",
                              "children": []
                            },
                            {
                              "text": "Should have modified the document for POST requests with a correct ETag",
                              "children": []
                            }
                          ]
                        },
                        {
                          "text": "Properly handles DELETE requests with If-Match",
                          "children": [
                            {
                              "text": "Should reject a DELETE request with a 412 Precondition Failed when using an incorrect ETag",
                              "children": []
                            },
                            {
                              "text": "Should not have modified the document for DELETE requests with an incorrect ETag",
                              "children": []
                            },
                            {
                              "text": "Should accept a DELETE request with a correct ETag",
                              "children": []
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "text": "If a PUT request is received without either header for a resource that already exists",
                      "children": []
                    }
                  ]
                },
                {
                  "text": "Concurrency for the Activity Profile Resource.",
                  "children": [
                    {
                      "text": "An LRS responding to a GET request SHALL add an ETag HTTP header to the response.",
                      "children": []
                    },
                    {
                      "text": "When responding to a GET Request the Etag header must be enclosed in quotes",
                      "children": []
                    },
                    {
                      "text": "When responding to a PUT, POST, or DELETE request, must handle the If-Match header as described in RFC 2616, HTTP/1.1 if it contains an ETag",
                      "children": [
                        {
                          "text": "Properly handles PUT requests with If-Match",
                          "children": [
                            {
                              "text": "Should reject a PUT request with a 412 Precondition Failed when using an incorrect ETag",
                              "children": []
                            },
                            {
                              "text": "Should not have modified the document for PUT requests with an incorrect ETag",
                              "children": []
                            },
                            {
                              "text": "Should accept a PUT request with a correct ETag",
                              "children": []
                            },
                            {
                              "text": "Should have modified the document for PUT requests with a correct ETag",
                              "children": []
                            }
                          ]
                        },
                        {
                          "text": "Properly handles POST requests with If-Match",
                          "children": [
                            {
                              "text": "Should reject a POST request with a 412 Precondition Failed when using an incorrect ETag",
                              "children": []
                            },
                            {
                              "text": "Should not have modified the document for POST requests with an incorrect ETag",
                              "children": []
                            },
                            {
                              "text": "Should accept a POST request with a correct ETag",
                              "children": []
                            },
                            {
                              "text": "Should have modified the document for POST requests with a correct ETag",
                              "children": []
                            }
                          ]
                        },
                        {
                          "text": "Properly handles DELETE requests with If-Match",
                          "children": [
                            {
                              "text": "Should reject a DELETE request with a 412 Precondition Failed when using an incorrect ETag",
                              "children": []
                            },
                            {
                              "text": "Should not have modified the document for DELETE requests with an incorrect ETag",
                              "children": []
                            },
                            {
                              "text": "Should accept a DELETE request with a correct ETag",
                              "children": []
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "text": "If a PUT request is received without either header for a resource that already exists",
                      "children": []
                    }
                  ]
                },
                {
                  "text": "Concurrency for the Agents Profile Resource.",
                  "children": [
                    {
                      "text": "An LRS responding to a GET request SHALL add an ETag HTTP header to the response.",
                      "children": []
                    },
                    {
                      "text": "When responding to a GET Request the Etag header must be enclosed in quotes",
                      "children": []
                    },
                    {
                      "text": "When responding to a PUT, POST, or DELETE request, must handle the If-Match header as described in RFC 2616, HTTP/1.1 if it contains an ETag",
                      "children": [
                        {
                          "text": "Properly handles PUT requests with If-Match",
                          "children": [
                            {
                              "text": "Should reject a PUT request with a 412 Precondition Failed when using an incorrect ETag",
                              "children": []
                            },
                            {
                              "text": "Should not have modified the document for PUT requests with an incorrect ETag",
                              "children": []
                            },
                            {
                              "text": "Should accept a PUT request with a correct ETag",
                              "children": []
                            },
                            {
                              "text": "Should have modified the document for PUT requests with a correct ETag",
                              "children": []
                            }
                          ]
                        },
                        {
                          "text": "Properly handles POST requests with If-Match",
                          "children": [
                            {
                              "text": "Should reject a POST request with a 412 Precondition Failed when using an incorrect ETag",
                              "children": []
                            },
                            {
                              "text": "Should not have modified the document for POST requests with an incorrect ETag",
                              "children": []
                            },
                            {
                              "text": "Should accept a POST request with a correct ETag",
                              "children": []
                            },
                            {
                              "text": "Should have modified the document for POST requests with a correct ETag",
                              "children": []
                            }
                          ]
                        },
                        {
                          "text": "Properly handles DELETE requests with If-Match",
                          "children": [
                            {
                              "text": "Should reject a DELETE request with a 412 Precondition Failed when using an incorrect ETag",
                              "children": []
                            },
                            {
                              "text": "Should not have modified the document for DELETE requests with an incorrect ETag",
                              "children": []
                            },
                            {
                              "text": "Should accept a DELETE request with a correct ETag",
                              "children": []
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "text": "If a PUT request is received without either header for a resource that already exists",
                      "children": []
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "text": "Statement Resource Requirements",
          "children": [
            {
              "text": "An LRS has a Statement Resource with endpoint \"base IRI\"+\"/statements\"",
              "children": [
                {
                  "text": "should allow \"/statements\" POST",
                  "children": []
                },
                {
                  "text": "should allow \"/statements\" PUT",
                  "children": []
                },
                {
                  "text": "should allow \"/statements\" GET",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS's Statement Resource upon processing a successful PUT request returns code 204 No Content",
              "children": [
                {
                  "text": "should persist statement and return status 204",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS's Statement Resource accepts PUT requests only if it contains a \"statementId\" parameter",
              "children": [
                {
                  "text": "should persist statement using \"statementId\" parameter",
                  "children": []
                },
                {
                  "text": "should fail without using \"statementId\" parameter",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS cannot modify a Statement, state, or Object in the event it receives a Statement with statementID equal to a Statement in the LRS already.",
              "children": [
                {
                  "text": "should not update statement with matching \"statementId\" on PUT",
                  "children": []
                },
                {
                  "text": "should not update statement with matching \"statementId\" on POST",
                  "children": []
                },
                {
                  "text": "should reject a batch of two or more statements where the same ID is used more than once.",
                  "children": []
                },
                {
                  "text": "should include a Last-Modified header which matches the \"stored\" Timestamp of the statement.",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS's Statement Resource accepts POST requests",
              "children": [
                {
                  "text": "should persist statement using \"POST\"",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS's Statement Resource upon processing a successful POST request returns code 200 OK and all Statement UUIDs within the POST **Implicit**",
              "children": [
                {
                  "text": "should persist statement using \"POST\" and return array of IDs",
                  "children": []
                }
              ]
            },
            {
              "text": "LRS's Statement Resource accepts GET requests",
              "children": [
                {
                  "text": "should return using GET",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS's Statement Resource upon processing a successful GET request with a \"statementId\" parameter, returns code 200 OK and a single Statement with the corresponding \"id\".",
              "children": [
                {
                  "text": "should retrieve statement using \"statementId\"",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS's Statement Resource upon processing a successful GET request with a \"voidedStatementId\" parameter, returns code 200 OK and a single Statement with the corresponding \"id\".",
              "children": [
                {
                  "text": "should return a voided statement when using GET \"voidedStatementId\"",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS's Statement Resource upon processing a successful GET request with neither a \"statementId\" nor a \"voidedStatementId\" parameter, returns code 200 OK and a StatementResult Object.",
              "children": [
                {
                  "text": "should return StatementResult using GET without \"statementId\" or \"voidedStatementId\"",
                  "children": []
                },
                {
                  "text": "should return StatementResult using GET with \"agent\"",
                  "children": []
                },
                {
                  "text": "should return StatementResult using GET with \"verb\"",
                  "children": []
                },
                {
                  "text": "should return StatementResult using GET with \"activity\"",
                  "children": []
                },
                {
                  "text": "should return StatementResult using GET with \"registration\"",
                  "children": []
                },
                {
                  "text": "should return StatementResult using GET with \"related_activities\"",
                  "children": []
                },
                {
                  "text": "should return StatementResult using GET with \"related_agents\"",
                  "children": []
                },
                {
                  "text": "should return StatementResult using GET with \"since\"",
                  "children": []
                },
                {
                  "text": "should return StatementResult using GET with \"until\"",
                  "children": []
                },
                {
                  "text": "should return StatementResult using GET with \"limit\"",
                  "children": []
                },
                {
                  "text": "should return StatementResult using GET with \"ascending\"",
                  "children": []
                },
                {
                  "text": "should return StatementResult using GET with \"format\"",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS's Statement Resource can process a GET request with \"statementId\" as a parameter",
              "children": [
                {
                  "text": "should process using GET with \"statementId\"",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS's Statement Resource can process a GET request with \"voidedStatementId\" as a parameter",
              "children": [
                {
                  "text": "should process using GET with \"voidedStatementId\"",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS's Statement Resource can process a GET request with \"agent\" as a parameter",
              "children": [
                {
                  "text": "should process using GET with \"agent\"",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS's Statement Resource can process a GET request with \"verb\" as a parameter",
              "children": [
                {
                  "text": "should process using GET with \"verb\"",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS's Statement Resource can process a GET request with \"activity\" as a parameter",
              "children": [
                {
                  "text": "should process using GET with \"activity\"",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS's Statement Resource can process a GET request with \"registration\" as a parameter",
              "children": [
                {
                  "text": "should process using GET with \"registration\"",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS's Statement Resource can process a GET request with \"related_activities\" as a parameter",
              "children": [
                {
                  "text": "should process using GET with \"related_activities\"",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS's Statement Resource can process a GET request with \"related_agents\" as a parameter",
              "children": [
                {
                  "text": "should process using GET with \"related_agents\"",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS's Statement Resource can process a GET request with \"since\" as a parameter",
              "children": [
                {
                  "text": "should process using GET with \"since\"",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS's Statement Resource can process a GET request with \"until\" as a parameter",
              "children": [
                {
                  "text": "should process using GET with \"until\"",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS's Statement Resource can process a GET request with \"limit\" as a parameter",
              "children": [
                {
                  "text": "should process using GET with \"limit\"",
                  "children": []
                }
              ]
            },
            {
              "text": "If the \"Accept-Language\" header is present as part of the GET request to the Statement API and the \"format\" parameter is set to \"canonical\", the LRS MUST apply this data to choose the matching language in the response.",
              "children": [
                {
                  "text": "should apply this data to choose the matching language in the response",
                  "children": []
                },
                {
                  "text": "should NOT apply this data to choose the matching language in the response when format is not set ",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS's Statement Resource can process a GET request with \"format\" as a parameter",
              "children": [
                {
                  "text": "should process using GET with \"format\" absent",
                  "children": []
                },
                {
                  "text": "should process using GET with \"format\" canonical",
                  "children": []
                },
                {
                  "text": "should process using GET with \"format\" exact",
                  "children": []
                },
                {
                  "text": "should process using GET with \"format\" ids",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS's Statement Resource can process a GET request with \"attachments\" as a parameter",
              "children": [
                {
                  "text": "should return multipart response format StatementResult using GET with \"attachments\" parameter as true",
                  "children": []
                },
                {
                  "text": "should not return multipart response format using GET with \"attachments\" parameter as false",
                  "children": []
                },
                {
                  "text": "should process using GET with \"attachments\"",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRSs Statement Resource, upon receiving a GET request, MUST have a \"Content-Type\" header",
              "children": [
                {
                  "text": "should contain the content-type header",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS's Statement Resource can process a GET request with \"ascending\" as a parameter",
              "children": [
                {
                  "text": "should process using GET with \"ascending\"",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS's Statement Resource rejects with error code 400 a GET request with both \"statementId\" and anything other than \"attachments\" or \"format\" as parameters",
              "children": [
                {
                  "text": "should fail when using \"statementId\" with \"agent\"",
                  "children": []
                },
                {
                  "text": "should fail when using \"statementId\" with \"verb\"",
                  "children": []
                },
                {
                  "text": "should fail when using \"statementId\" with \"activity\"",
                  "children": []
                },
                {
                  "text": "should fail when using \"statementId\" with \"registration\"",
                  "children": []
                },
                {
                  "text": "should fail when using \"statementId\" with \"related_activities\"",
                  "children": []
                },
                {
                  "text": "should fail when using \"statementId\" with \"related_agents\"",
                  "children": []
                },
                {
                  "text": "should fail when using \"statementId\" with \"since\"",
                  "children": []
                },
                {
                  "text": "should fail when using \"statementId\" with \"until\"",
                  "children": []
                },
                {
                  "text": "should fail when using \"statementId\" with \"limit\"",
                  "children": []
                },
                {
                  "text": "should fail when using \"statementId\" with \"ascending\"",
                  "children": []
                },
                {
                  "text": "should pass when using \"statementId\" with \"format\"",
                  "children": []
                },
                {
                  "text": "should pass when using \"statementId\" with \"attachments\"",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS's Statement Resource rejects with error code 400 a GET request with both \"voidedStatementId\" and anything other than \"attachments\" or \"format\" as parameters",
              "children": [
                {
                  "text": "should fail when using \"voidedStatementId\" with \"agent\"",
                  "children": []
                },
                {
                  "text": "should fail when using \"voidedStatementId\" with \"verb\"",
                  "children": []
                },
                {
                  "text": "should fail when using \"voidedStatementId\" with \"activity\"",
                  "children": []
                },
                {
                  "text": "should fail when using \"voidedStatementId\" with \"registration\"",
                  "children": []
                },
                {
                  "text": "should fail when using \"voidedStatementId\" with \"related_activities\"",
                  "children": []
                },
                {
                  "text": "should fail when using \"voidedStatementId\" with \"related_agents\"",
                  "children": []
                },
                {
                  "text": "should fail when using \"voidedStatementId\" with \"since\"",
                  "children": []
                },
                {
                  "text": "should fail when using \"voidedStatementId\" with \"until\"",
                  "children": []
                },
                {
                  "text": "should fail when using \"voidedStatementId\" with \"limit\"",
                  "children": []
                },
                {
                  "text": "should fail when using \"voidedStatementId\" with \"ascending\"",
                  "children": []
                },
                {
                  "text": "should pass when using \"voidedStatementId\" with \"format\"",
                  "children": []
                },
                {
                  "text": "should pass when using \"voidedStatementId\" with \"attachments\"",
                  "children": []
                }
              ]
            },
            {
              "text": "The LRS will NOT reject a GET request which returns an empty \"statements\" property",
              "children": [
                {
                  "text": "should return empty array list",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS's Statement Resource upon processing a GET request, returns a header with name \"X-Experience-API-Consistent-Through\" regardless of the code returned.",
              "children": [
                {
                  "text": "should return \"X-Experience-API-Consistent-Through\" using GET",
                  "children": []
                },
                {
                  "text": "should return \"X-Experience-API-Consistent-Through\" misusing GET",
                  "children": []
                },
                {
                  "text": "should return \"X-Experience-API-Consistent-Through\" using GET with \"agent\"",
                  "children": []
                },
                {
                  "text": "should return \"X-Experience-API-Consistent-Through\" using GET with \"verb\"",
                  "children": []
                },
                {
                  "text": "should return \"X-Experience-API-Consistent-Through\" using GET with \"activity\"",
                  "children": []
                },
                {
                  "text": "should return \"X-Experience-API-Consistent-Through\" using GET with \"registration\"",
                  "children": []
                },
                {
                  "text": "should return \"X-Experience-API-Consistent-Through\" using GET with \"related_activities\"",
                  "children": []
                },
                {
                  "text": "should return \"X-Experience-API-Consistent-Through\" using GET with \"related_agents\"",
                  "children": []
                },
                {
                  "text": "should return \"X-Experience-API-Consistent-Through\" using GET with \"since\"",
                  "children": []
                },
                {
                  "text": "should return \"X-Experience-API-Consistent-Through\" using GET with \"until\"",
                  "children": []
                },
                {
                  "text": "should return \"X-Experience-API-Consistent-Through\" using GET with \"limit\"",
                  "children": []
                },
                {
                  "text": "should return \"X-Experience-API-Consistent-Through\" using GET with \"ascending\"",
                  "children": []
                },
                {
                  "text": "should return \"X-Experience-API-Consistent-Through\" using GET with \"format\"",
                  "children": []
                },
                {
                  "text": "should return \"X-Experience-API-Consistent-Through\" using GET with \"attachments\"",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS's \"X-Experience-API-Consistent-Through\" header is an ISO 8601 combined date and time",
              "children": [
                {
                  "text": "should return valid \"X-Experience-API-Consistent-Through\" using GET",
                  "children": []
                },
                {
                  "text": "should return \"X-Experience-API-Consistent-Through\" using GET with \"agent\"",
                  "children": []
                },
                {
                  "text": "should return \"X-Experience-API-Consistent-Through\" using GET with \"verb\"",
                  "children": []
                },
                {
                  "text": "should return \"X-Experience-API-Consistent-Through\" using GET with \"activity\"",
                  "children": []
                },
                {
                  "text": "should return \"X-Experience-API-Consistent-Through\" using GET with \"registration\"",
                  "children": []
                },
                {
                  "text": "should return \"X-Experience-API-Consistent-Through\" using GET with \"related_activities\"",
                  "children": []
                },
                {
                  "text": "should return \"X-Experience-API-Consistent-Through\" using GET with \"related_agents\"",
                  "children": []
                },
                {
                  "text": "should return \"X-Experience-API-Consistent-Through\" using GET with \"since\"",
                  "children": []
                },
                {
                  "text": "should return \"X-Experience-API-Consistent-Through\" using GET with \"until\"",
                  "children": []
                },
                {
                  "text": "should return \"X-Experience-API-Consistent-Through\" using GET with \"limit\"",
                  "children": []
                },
                {
                  "text": "should return \"X-Experience-API-Consistent-Through\" using GET with \"ascending\"",
                  "children": []
                },
                {
                  "text": "should return \"X-Experience-API-Consistent-Through\" using GET with \"format\"",
                  "children": []
                },
                {
                  "text": "should return \"X-Experience-API-Consistent-Through\" using GET with \"attachments\"",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRSs Statement Resource does not return attachment data and only returns application/json if the \"attachment\" parameter set to \"false\"",
              "children": [
                {
                  "text": "should NOT return the attachment if \"attachments\" is missing",
                  "children": []
                },
                {
                  "text": "should NOT return the attachment if \"attachments\" is false",
                  "children": []
                },
                {
                  "text": "should return the attachment when \"attachment\" is true",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS's Statement Resource, upon processing a successful GET request, can only return a Voided Statement if that Statement is specified in the voidedStatementId parameter of that request",
              "children": [
                {
                  "text": "should not return a voided statement if using GET \"statementId\"",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS's Statement Resource, upon processing a successful GET request wishing to return a Voided Statement still returns Statements which target it",
              "children": [
                {
                  "text": "should only return statements stored after designated \"since\" timestamp when using \"since\" parameter",
                  "children": []
                },
                {
                  "text": "should only return statements stored at or before designated \"before\" timestamp when using \"until\" parameter",
                  "children": []
                },
                {
                  "text": "should return the number of statements listed in \"limit\" parameter",
                  "children": []
                },
                {
                  "text": "should return StatementRef and voiding statement when not using \"since\", \"until\", \"limit\"",
                  "children": []
                }
              ]
            },
            {
              "text": "The Statements within the \"statements\" property will correspond to the filtering criterion sent in with the GET request",
              "children": [
                {
                  "text": "should return StatementResult with statements as array using GET with \"agent\"",
                  "children": []
                },
                {
                  "text": "should return StatementResult with statements as array using GET with \"verb\"",
                  "children": []
                },
                {
                  "text": "should return StatementResult with statements as array using GET with \"activity\"",
                  "children": []
                },
                {
                  "text": "should return StatementResult with statements as array using GET with \"registration\"",
                  "children": []
                },
                {
                  "text": "should return StatementResult with statements as array using GET with \"related_activities\"",
                  "children": []
                },
                {
                  "text": "should return StatementResult with statements as array using GET with \"related_agents\"",
                  "children": []
                },
                {
                  "text": "should return StatementResult with statements as array using GET with \"since\"",
                  "children": []
                },
                {
                  "text": "should return StatementResult with statements as array using GET with \"until\"",
                  "children": []
                },
                {
                  "text": "should return StatementResult with statements as array using GET with \"limit\"",
                  "children": []
                },
                {
                  "text": "should return StatementResult with statements as array using GET with \"ascending\"",
                  "children": []
                },
                {
                  "text": "should return StatementResult with statements as array using GET with \"format\"",
                  "children": []
                },
                {
                  "text": "should return StatementResult with statements as array using GET with \"attachments\"",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS's Statement Resource rejects with error code 400 a GET request with additional properties than extensions in the locations where extensions are allowed",
              "children": [
                {
                  "text": "should fail when using property not defined in specification",
                  "children": []
                }
              ]
            },
            {
              "text": "The LRS shall set the \"timestamp\" property to the value of the \"stored\" property if not provided.",
              "children": [
                {
                  "text": "should set timestamp property to equal \"stored\" value if retrieved statement does not have its own timestamp",
                  "children": []
                }
              ]
            },
            {
              "text": "The LRS shall not reject a timestamp for having a greater value than the current time, within an acceptable margin of error",
              "children": [
                {
                  "text": "accepts statements with greater value than current time",
                  "children": []
                }
              ]
            }
          ]
        },
        {
          "text": "State Resource Requirements",
          "children": [
            {
              "text": "An LRS has a State Resource with endpoint \"base IRI\"+\"/activities/state\"",
              "children": []
            },
            {
              "text": "An LRS's State Resource accepts PUT requests",
              "children": []
            },
            {
              "text": "An LRS's State Resource accepts POST requests",
              "children": []
            },
            {
              "text": "An LRS's State Resource accepts GET requests",
              "children": []
            },
            {
              "text": "An LRS's State Resource accepts DELETE requests",
              "children": []
            },
            {
              "text": "An LRS's State Resource upon processing a successful GET request with a valid \"stateId\" as a parameter returns the document satisfying the requirements of the GET and code 200 OK",
              "children": []
            },
            {
              "text": "An LRS's State Resource upon processing a successful DELETE request with a valid \"stateId\" as a parameter deletes the document satisfying the requirements of the DELETE and returns code 204 No Content",
              "children": []
            },
            {
              "text": "An LRS's State Resource rejects a PUT request without \"activityId\" as a parameter with error code 400 Bad Request",
              "children": []
            },
            {
              "text": "An LRS's State Resource rejects a POST request without \"activityId\" as a parameter with error code 400 Bad Request",
              "children": []
            },
            {
              "text": "An LRS's State Resource rejects a GET request without \"activityId\" as a parameter with error code 400 Bad Request",
              "children": []
            },
            {
              "text": "An LRS's State Resource rejects a DELETE request without \"activityId\" as a parameter with error code 400 Bad Request",
              "children": []
            },
            {
              "text": "An LRS's State Resource rejects a PUT request without \"agent\" as a parameter with error code 400 Bad Request",
              "children": []
            },
            {
              "text": "An LRS's State Resource rejects a PUT request with \"agent\" as a parameter if it is not in JSON format with error code 400 Bad Request",
              "children": []
            },
            {
              "text": "An LRS's State Resource rejects a POST request without \"agent\" as a parameter with error code 400 Bad Request",
              "children": []
            },
            {
              "text": "An LRS's State Resource rejects a GET request without \"agent\" as a parameter with error code 400 Bad Request",
              "children": []
            },
            {
              "text": "An LRS's State Resource rejects a DELETE request without \"agent\" as a parameter with error code 400 Bad Request",
              "children": []
            },
            {
              "text": "An LRS's State Resource can process a PUT request with \"registration\" as a parameter",
              "children": []
            },
            {
              "text": "An LRS's State Resource, rejects a POST request if the document is found and either document's type is not \"application/json\" with error code 400 Bad Request",
              "children": []
            },
            {
              "text": "An LRS's State Resource, upon receiving a POST request for a document not currently in the LRS, treats it as a PUT request and store a new document",
              "children": []
            },
            {
              "text": "An LRS's State Resource performs a Document Merge if a document is found and both it and the document in the POST request have type \"application/json\"",
              "children": []
            },
            {
              "text": "An LRS must reject with 400 Bad Request a POST request to the State Resource which contains name/value pairs with invalid JSON and the Content-Type header is 'application/json'",
              "children": []
            },
            {
              "text": "An LRS's State Resource can process a POST request with \"registration\" as a parameter",
              "children": []
            },
            {
              "text": "An LRS's State Resource can process a GET request with \"registration\" as a parameter",
              "children": []
            },
            {
              "text": "An LRS's State Resource can process a DELETE request with \"registration\" as a parameter",
              "children": []
            },
            {
              "text": "An LRS's State Resource rejects a PUT request without \"stateId\" as a parameter with error code 400 Bad Request",
              "children": []
            },
            {
              "text": "An LRS's State Resource rejects a POST request without \"stateId\" as a parameter with error code 400 Bad Request",
              "children": []
            },
            {
              "text": "An LRS's State Resource can process a GET request with \"stateId\" as a parameter",
              "children": []
            },
            {
              "text": "An LRS's State Resource can process a GET request with \"since\" as a parameter",
              "children": []
            },
            {
              "text": "An LRS's State Resource rejects a GET request with \"since\" as a parameter if it is not a \"TimeStamp\", with error code 400 Bad Request",
              "children": []
            },
            {
              "text": "An LRS's State Resource can process a DELETE request with \"stateId\" as a parameter",
              "children": []
            },
            {
              "text": "An LRS's State Resource upon processing a successful GET request without \"stateId\" as a parameter returns an array of ids of state data documents satisfying the requirements of the GET and code 200 OK",
              "children": []
            },
            {
              "text": "An LRS's returned array of ids from a successful GET request to the State Resource all refer to documents stored after the TimeStamp in the \"since\" parameter of the GET request",
              "children": []
            },
            {
              "text": "An LRS's State Resource upon processing a successful DELETE request without \"stateId\" as a parameter deletes documents satisfying the requirements of the DELETE and code 204 No Content",
              "children": []
            },
            {
              "text": "An LRS's State Resource rejects a POST request with \"agent\" as a parameter if it is not in JSON format with error code 400 Bad Request",
              "children": [
                {
                  "text": "Should reject POST State with agent invalid value",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS's State Resource rejects a GET request with \"agent\" as a parameter if it is not in JSON format with error code 400 Bad Request",
              "children": [
                {
                  "text": "Should reject GET with \"agent\" with invalid value",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS's State Resource rejects a DELETE request with \"agent\" as a parameter if it is not in JSON format with error code 400 Bad Request",
              "children": [
                {
                  "text": "Should reject DELETE with \"agent\" with invalid value",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS's State Resource rejects a PUT request with \"registration\" as a parameter if it is not a UUID with error code 400 Bad Request",
              "children": [
                {
                  "text": "Should reject PUT with \"registration\" with invalid value",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRSs State Resource, rejects a POST request if the document is found and either document is not a valid JSON Object",
              "children": [
                {
                  "text": "If the document being posted to the State Resource does not have a Content-Type of application/json and the existing document does, the LRS MUST respond with HTTP status code 400 Bad Request, and MUST NOT update the target document as a result of the request.",
                  "children": []
                },
                {
                  "text": "If the existing document does not have a Content-Type of application/json but the document being posted to the State Resource does the LRS MUST respond with HTTP status code 400 Bad Request, and MUST NOT update the target document as a result of the request.",
                  "children": []
                },
                {
                  "text": "If the document being posted to the State Resource has a content type of Content-Type of application/json but cannot be parsed as a JSON Object, the LRS MUST respond with HTTP status code 400 Bad Request, and MUST NOT update the target document as a result of the request.",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS's State Resource rejects a POST request with \"registration\" as a parameter if it is not a UUID with error code 400 Bad Request",
              "children": [
                {
                  "text": "Should reject POST with \"registration\" with invalid value",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS's State Resource rejects a GET request with \"registration\" as a parameter if it is not a UUID with error code 400 Bad Request",
              "children": [
                {
                  "text": "Should reject GET with \"registration\" with invalid value",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS's State Resource rejects a DELETE request with \"registration\" as a parameter if it is not a UUID with error code 400 Bad Request",
              "children": [
                {
                  "text": "Should reject DELETE with \"registration\" with invalid value",
                  "children": []
                }
              ]
            },
            {
              "text": "The LRS shall include a Last-Modified header indicating when the document was last modified.",
              "children": [
                {
                  "text": "Returns a Last-Modified header at all",
                  "children": []
                },
                {
                  "text": "Updates the Last-Modified value when the corresponding document is updated.",
                  "children": []
                }
              ]
            }
          ]
        },
        {
          "text": "Agents Resource Requirements",
          "children": [
            {
              "text": "An LRS has an Agents Resource with endpoint \"base IRI\" + /agents\"",
              "children": []
            },
            {
              "text": "An LRS's Agents Resource accepts GET requests",
              "children": []
            },
            {
              "text": "An LRS's Agent Resource upon processing a successful GET request returns a Person Object if the \"agent\" parameter can be found in the LRS and code 200 OK",
              "children": []
            },
            {
              "text": "An LRS's Agents Resource rejects a GET request without \"agent\" as a parameter with error code 400 Bad Request",
              "children": []
            },
            {
              "text": "A Person Object's \"objectType\" property is a String and is \"Person\"",
              "children": []
            },
            {
              "text": "A Person Object's \"name\" property is an Array of Strings",
              "children": []
            },
            {
              "text": "A Person Object's \"mbox\" property is an Array of IRIs",
              "children": []
            },
            {
              "text": "A Person Object's \"mbox\" entries have the form \"mailto:emailaddress\"",
              "children": []
            },
            {
              "text": "A Person Object's \"mbox_sha1sum\" property is an Array of Strings",
              "children": []
            },
            {
              "text": "A Person Object's \"openid\" property is an Array of Strings",
              "children": []
            },
            {
              "text": "A Person Object's \"account\" property is an Array of Account Objects",
              "children": []
            },
            {
              "text": "An LRSs Agents Resource rejects a GET request with \"agent\" as a parameter if it is not a valid, in structure, Agent with error code 400 Bad Request",
              "children": []
            }
          ]
        },
        {
          "text": "Activities Resource Requirements",
          "children": [
            {
              "text": "An LRS has an Activities Resource with endpoint \"base IRI\" + /activities\"",
              "children": []
            },
            {
              "text": "An LRS's Activities Resource accepts GET requests",
              "children": []
            },
            {
              "text": "An LRS's Activities Resource upon processing a successful GET request returns the complete Activity Object",
              "children": []
            },
            {
              "text": "An LRS's Activities Resource rejects a GET request without \"activityId\" as a parameter with error code 400 Bad Request",
              "children": []
            },
            {
              "text": "An LRS's Activities Resource rejects a GET request with \"activityId\" as a parameter if it is not type \"String\" with error code 400 Bad Request",
              "children": []
            },
            {
              "text": "The Activity Object must contain all available information about an activity from any statements who target the same \"activityId\". For example, LRS accepts two statements each with a different language description of an activity using the exact same \"activityId\". The LRS must return both language descriptions when a GET request is made to the Activities endpoint for that \"activityId\"",
              "children": []
            },
            {
              "text": "If an LRS does not have a canonical definition of the Activity to return, the LRS shall still return an Activity Object when queried.",
              "children": []
            }
          ]
        },
        {
          "text": "Agent Profile Resource Requirements",
          "children": [
            {
              "text": "An LRS's Agent Profile Resource upon processing a successful GET request with a valid \"profileId\" as a parameter returns the document satisfying the requirements of the GET and code 200 OK",
              "children": []
            },
            {
              "text": "An LRS's Agent Profile Resource rejects a PUT request without \"agent\" as a parameter with error code 400 Bad Request",
              "children": []
            },
            {
              "text": "An LRS's Agent Profile Resource rejects a POST request without \"agent\" as a parameter with error code 400 Bad Request",
              "children": []
            },
            {
              "text": "An LRS's Agent Profile Resource rejects a POST request with \"agent\" as a parameter if it is not an Agent Object with error code 400 Bad Request",
              "children": []
            },
            {
              "text": "An LRS's Agent Profile Resource rejects a DELETE request without \"agent\" as a parameter with error code 400 Bad Request",
              "children": []
            },
            {
              "text": "An LRS's Agent Profile Resource rejects a PUT request without \"profileId\" as a parameter with error code 400 Bad Request",
              "children": []
            },
            {
              "text": "An LRS's Agent Profile Resource rejects a POST request without \"profileId\" as a parameter with error code 400 Bad Request",
              "children": []
            },
            {
              "text": "An LRS's Agent Profile Resource rejects a DELETE request without \"profileId\" as a parameter with error code 400 Bad Request",
              "children": []
            },
            {
              "text": "An LRS's Agent Profile Resource upon processing a successful GET request without \"profileId\" as a parameter returns an array of ids of agent profile documents satisfying the requirements of the GET and code 200 OK",
              "children": []
            },
            {
              "text": "An LRS's Agent Profile Resource rejects a GET request without \"agent\" as a parameter with error code 400 Bad Request",
              "children": []
            },
            {
              "text": "An LRS's Agent Profile Resource can process a GET request with \"since\" as a parameter",
              "children": []
            },
            {
              "text": "An LRS's returned array of ids from a successful GET request to the Agent Profile Resource all refer to documents stored after the TimeStamp in the \"since\" parameter of the GET request if such a parameter was present",
              "children": []
            },
            {
              "text": "An LRS's Agent Profile Resource performs a Document Merge if a document is found and both it and the document in the POST request have type \"application/json\"",
              "children": []
            },
            {
              "text": "An LRS's Agent Profile Resource, upon receiving a POST request for a document not currently in the LRS, treats it as a PUT request and store a new document",
              "children": []
            },
            {
              "text": "An LRS's Agent Profile Resource, rejects a POST request if the document is found and either document is not a valid JSON Object",
              "children": []
            },
            {
              "text": "An LRS must reject with 400 Bad Request a POST request to the Activitiy Profile Resource which contains name/value pairs with invalid JSON and the Content-Type header is 'application/json'",
              "children": []
            },
            {
              "text": "An LRS has an Agent Profile Resource with endpoint \"base IRI\"+\"/agents/profile\"",
              "children": [
                {
                  "text": "An LRS's Agent Profile Resource accepts GET requests",
                  "children": []
                },
                {
                  "text": "An LRS's Agent Profile Resource upon processing a successful PUT request returns code 204 No Content",
                  "children": []
                },
                {
                  "text": "An LRS's Agent Profile Resource upon processing a successful POST request returns code 204 No Content",
                  "children": []
                },
                {
                  "text": "An LRS's Agent Profile Resource upon processing a successful DELETE request deletes the associated profile and returns code 204 No Content",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS's Agent Profile Resource rejects a PUT request with \"agent\" as a parameter if it is not an Agent Object with error code 400 Bad Request",
              "children": [
                {
                  "text": "Should reject PUT with \"agent\" with invalid value",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS's Agent Profile Resource rejects a DELETE request with \"agent\" as a parameter if it is not an Agent Object with error code 400 Bad Request",
              "children": [
                {
                  "text": "Should reject DELETE with \"agent\" with invalid value",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS's Agent Profile Resource rejects a GET request with \"agent\" as a parameter if it is a valid, in structure, Agent with error code 400 Bad Request",
              "children": [
                {
                  "text": "Should reject GET with \"agent\" with invalid value",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS's Agent Profile Resource rejects a GET request with \"since\" as a parameter if it is not a \"TimeStamp\", with error code 400 Bad Request",
              "children": [
                {
                  "text": "Should reject GET with \"since\" with invalid value",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRSs Agent Profile Resource, rejects a POST request if the document is found and either documents type is not \"application/json\" with error code 400 Bad Request",
              "children": [
                {
                  "text": "If the document being posted to the Agent Profile Resource does not have a Content-Type of application/json and the existing document does, the LRS MUST respond with HTTP status code 400 Bad Request, and MUST NOT update the target document as a result of the request.",
                  "children": []
                },
                {
                  "text": "If the existing document does not have a Content-Type of application/json but the document being posted to the Agent Profile Resource does the LRS MUST respond with HTTP status code 400 Bad Request, and MUST NOT update the target document as a result of the request.",
                  "children": []
                },
                {
                  "text": "If the document being posted to the Agent Profile Resource has a content type of Content-Type of application/json but cannot be parsed as a JSON Object, the LRS MUST respond with HTTP status code 400 Bad Request, and MUST NOT update the target document as a result of the request.",
                  "children": []
                }
              ]
            },
            {
              "text": "The LRS shall include a Last-Modified header indicating when the document was last modified.",
              "children": [
                {
                  "text": "Returns a Last-Modified header at all",
                  "children": []
                },
                {
                  "text": "Updates the Last-Modified value when the corresponding document is updated.",
                  "children": []
                }
              ]
            }
          ]
        },
        {
          "text": "Activity Profile Resource Requirements",
          "children": [
            {
              "text": "An LRS has an Activity Profile Resource with endpoint \"base IRI\"+\"/activities/profile\"",
              "children": []
            },
            {
              "text": "An LRS's Activity Profile Resource accepts POST requests",
              "children": []
            },
            {
              "text": "An LRS's Activity Profile Resource accepts DELETE requests",
              "children": []
            },
            {
              "text": "An LRS's Activity Profile Resource accepts GET requests",
              "children": []
            },
            {
              "text": "An LRS's Activity Profile Resource upon processing a successful GET request with a valid \"profileId\" as a parameter returns the document satisfying the requirements of the GET and code 200 OK",
              "children": []
            },
            {
              "text": "An LRS's Activity Profile Resource rejects a PUT request without \"activityId\" as a parameter with error code 400 Bad Request",
              "children": []
            },
            {
              "text": "An LRS's Activity Profile Resource rejects a POST request without \"activityId\" as a parameter with error code 400 Bad Request",
              "children": []
            },
            {
              "text": "An LRS's Activity Profile Resource rejects a DELETE request without \"activityId\" as a parameter with error code 400 Bad Request",
              "children": []
            },
            {
              "text": "An LRS's Activity Profile Resource rejects a GET request without \"activityId\" as a parameter with error code 400 Bad Request",
              "children": []
            },
            {
              "text": "An LRS's Activity Profile Resource rejects a PUT request without \"profileId\" as a parameter with error code 400 Bad Request",
              "children": []
            },
            {
              "text": "An LRS's Activity Profile Resource rejects a POST request without \"profileId\" as a parameter with error code 400 Bad Request",
              "children": []
            },
            {
              "text": "An LRS's Activity Profile Resource rejects a DELETE request without \"profileId\" as a parameter with error code 400 Bad Request",
              "children": []
            },
            {
              "text": "An LRS's Activity Profile Resource upon processing a successful GET request without \"profileId\" as a parameter returns an array of ids of activity profile documents satisfying the requirements of the GET and code 200 OK",
              "children": []
            },
            {
              "text": "An LRS's Activity Profile Resource can process a GET request with \"since\" as a parameter",
              "children": []
            },
            {
              "text": "An LRS's returned array of ids from a successful GET request to the Activity Profile Resource all refer to documents stored after the TimeStamp in the \"since\" parameter of the GET request if such a parameter was present",
              "children": []
            },
            {
              "text": "An LRS's Activity Profile Resource, upon receiving a POST request for a document not currently in the LRS, treats it as a PUT request and store a new document",
              "children": []
            },
            {
              "text": "An LRS's Activity Profile Resource performs a Document Merge if a document is found and both it and the document in the POST request have type \"application/json\"",
              "children": []
            },
            {
              "text": "An LRS's Activity Profile Resource, rejects a POST request if the document is found and either document's type is not \"application/json\" with error code 400 Bad Request",
              "children": []
            },
            {
              "text": "An LRS's must reject, with 400 Bad Request, a POST request to the Activity Profile Resource which contains name/value pairs with invalid JSON and the Content-Type header is \"application/json\"",
              "children": []
            },
            {
              "text": "An LRS's Activity Profile Resource accepts PUT requests",
              "children": [
                {
                  "text": "passes with 204 no content",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS's Activity Profile Resource rejects a GET request with \"since\" as a parameter if it is not a \"TimeStamp\", with error code 400 Bad Request",
              "children": [
                {
                  "text": "Should reject GET with \"since\" with invalid value",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS's Activity Profile Resource, rejects a POST request if the document is found and either document is not a valid JSON Object",
              "children": [
                {
                  "text": "If the document being posted to the Activity Profile Resource does not have a Content-Type of application/json and the existing document does, the LRS MUST respond with HTTP status code 400 Bad Request, and MUST NOT update the target document as a result of the request.",
                  "children": []
                },
                {
                  "text": "If the existing document does not have a Content-Type of application/json but the document being posted to the Activity Profile Resource does the LRS MUST respond with HTTP status code 400 Bad Request, and MUST NOT update the target document as a result of the request.",
                  "children": []
                },
                {
                  "text": "If the document being posted to the Activity Profile Resource has a content type of Content-Type of application/json but cannot be parsed as a JSON Object, the LRS MUST respond with HTTP status code 400 Bad Request, and MUST NOT update the target document as a result of the request.",
                  "children": []
                }
              ]
            },
            {
              "text": "The LRS shall include a Last-Modified header indicating when the document was last modified.",
              "children": [
                {
                  "text": "Returns a Last-Modified header at all",
                  "children": []
                },
                {
                  "text": "Updates the Last-Modified value when the corresponding document is updated.",
                  "children": []
                }
              ]
            }
          ]
        },
        {
          "text": "About Resource Requirements",
          "children": [
            {
              "text": "An LRS has an About Resource with endpoint \"base IRI\"+\"/about\"",
              "children": []
            },
            {
              "text": "An LRS's About Resource upon processing a successful GET request returns a version property and code 200 OK",
              "children": []
            },
            {
              "text": "An LRS's About Resource's version property is an array of strings",
              "children": []
            },
            {
              "text": "An LRS's About Resource's version property contains at least one string of \"2.0.0\"",
              "children": []
            },
            {
              "text": "An LRS's About Resource's version property can only have values of \"0.9\", \"0.95\", \"1.0.0\", or \"\"1.0.\" + X\" with",
              "children": []
            },
            {
              "text": "An LRS rejects with error code 400 Bad Request, a Request which does not use a \"X-Experience-API-Version\" header name to any Resource except the About Resource",
              "children": [
                {
                  "text": "using Statement Endpoint",
                  "children": []
                },
                {
                  "text": "using Activities Endpoint",
                  "children": []
                },
                {
                  "text": "using Activities Profile Endpoint",
                  "children": []
                },
                {
                  "text": "using Activities State Endpoint",
                  "children": []
                },
                {
                  "text": "using Agents Endpoint",
                  "children": []
                },
                {
                  "text": "using Agents Profile Endpoint",
                  "children": []
                }
              ]
            }
          ]
        },
        {
          "text": "Actor Property Requirements",
          "children": [
            {
              "text": "An \"actor\" property's \"objectType\" property is either \"Agent\" or \"Group\"",
              "children": [
                {
                  "text": "statement actor \"objectType\" should fail when not \"Agent\"",
                  "children": []
                },
                {
                  "text": "statement actor \"objectType\" should fail when not \"Group\"",
                  "children": []
                },
                {
                  "text": "statement authority \"objectType\" should fail when not \"Agent\"",
                  "children": []
                },
                {
                  "text": "statement authority \"objectType\" should fail when not \"Group\"",
                  "children": []
                },
                {
                  "text": "statement context instructor \"objectType\" should fail when not \"Agent\"",
                  "children": []
                },
                {
                  "text": "statement context instructor \"objectType\" should fail when not \"Group\"",
                  "children": []
                },
                {
                  "text": "statement substatement as agent with \"objectType\" should fail when not \"Agent\"",
                  "children": []
                },
                {
                  "text": "statement substatement as group with \"objectType\" should fail when not \"Group\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s actor \"objectType\" should fail when not \"Agent\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s actor \"objectType\" should fail when not \"Group\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor \"objectType\" should fail when not \"Agent\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor \"objectType\" should fail when not \"Group\"",
                  "children": []
                }
              ]
            },
            {
              "text": "An \"objectType\" property is a String",
              "children": [
                {
                  "text": "statement actor \"objectType\" should fail numeric",
                  "children": []
                },
                {
                  "text": "statement actor \"objectType\" should fail object",
                  "children": []
                },
                {
                  "text": "statement authority \"objectType\" should fail numeric",
                  "children": []
                },
                {
                  "text": "statement authority \"objectType\" should fail object",
                  "children": []
                },
                {
                  "text": "statement context instructor \"objectType\" should fail numeric",
                  "children": []
                },
                {
                  "text": "statement context instructor \"objectType\" should fail object",
                  "children": []
                },
                {
                  "text": "statement substatement as agent with \"objectType\" should fail numeric",
                  "children": []
                },
                {
                  "text": "statement substatement as agent with \"objectType\" should fail object",
                  "children": []
                },
                {
                  "text": "statement substatement\"s agent \"objectType\" should fail numeric",
                  "children": []
                },
                {
                  "text": "statement substatement\"s agent \"objectType\" should fail object",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor \"objectType\" should fail numeric",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor \"objectType\" should fail object",
                  "children": []
                }
              ]
            },
            {
              "text": "A \"name\" property is a String",
              "children": [
                {
                  "text": "statement actor \"name\" should fail numeric",
                  "children": []
                },
                {
                  "text": "statement actor \"name\" should fail object",
                  "children": []
                },
                {
                  "text": "statement authority \"name\" should fail numeric",
                  "children": []
                },
                {
                  "text": "statement authority \"name\" should fail object",
                  "children": []
                },
                {
                  "text": "statement context instructor \"name\" should fail numeric",
                  "children": []
                },
                {
                  "text": "statement context instructor \"name\" should fail object",
                  "children": []
                },
                {
                  "text": "statement substatement as agent with \"name\" should fail numeric",
                  "children": []
                },
                {
                  "text": "statement substatement as agent with \"name\" should fail object",
                  "children": []
                },
                {
                  "text": "statement substatement\"s agent \"name\" should fail numeric",
                  "children": []
                },
                {
                  "text": "statement substatement\"s agent \"name\" should fail object",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor \"name\" should fail numeric",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor \"name\" should fail object",
                  "children": []
                }
              ]
            },
            {
              "text": "An \"actor\" property with \"objectType\" as \"Agent\" uses one of the following properties: \"mbox\", \"mbox_sha1sum\", \"openid\", \"account\"",
              "children": [
                {
                  "text": "statement actor without \"account\", \"mbox\", \"mbox_sha1sum\", \"openid\" should fail",
                  "children": []
                },
                {
                  "text": "statement actor \"account\" should pass",
                  "children": []
                },
                {
                  "text": "statement actor \"mbox\" should pass",
                  "children": []
                },
                {
                  "text": "statement actor \"mbox_sha1sum\" should pass",
                  "children": []
                },
                {
                  "text": "statement actor \"openid\" should pass",
                  "children": []
                },
                {
                  "text": "statement authority without \"account\", \"mbox\", \"mbox_sha1sum\", \"openid\" should fail",
                  "children": []
                },
                {
                  "text": "statement authority \"account\" should pass",
                  "children": []
                },
                {
                  "text": "statement authority \"mbox\" should pass",
                  "children": []
                },
                {
                  "text": "statement authority \"mbox_sha1sum\" should pass",
                  "children": []
                },
                {
                  "text": "statement authority \"openid\" should pass",
                  "children": []
                },
                {
                  "text": "statement context instructor without \"account\", \"mbox\", \"mbox_sha1sum\", \"openid\" should fail",
                  "children": []
                },
                {
                  "text": "statement context instructor \"account\" should pass",
                  "children": []
                },
                {
                  "text": "statement context instructor \"mbox\" should pass",
                  "children": []
                },
                {
                  "text": "statement context instructor \"mbox_sha1sum\" should pass",
                  "children": []
                },
                {
                  "text": "statement context instructor \"openid\" should pass",
                  "children": []
                },
                {
                  "text": "statement substatement as agent without \"account\", \"mbox\", \"mbox_sha1sum\", \"openid\" should fail",
                  "children": []
                },
                {
                  "text": "statement substatement as agent \"account\" should pass",
                  "children": []
                },
                {
                  "text": "statement substatement as agent \"mbox\" should pass",
                  "children": []
                },
                {
                  "text": "statement substatement as agent \"mbox_sha1sum\" should pass",
                  "children": []
                },
                {
                  "text": "statement substatement as agent \"openid\" should pass",
                  "children": []
                },
                {
                  "text": "statement substatement\"s agent without \"account\", \"mbox\", \"mbox_sha1sum\", \"openid\" should fail",
                  "children": []
                },
                {
                  "text": "statement substatement\"s agent \"account\" should pass",
                  "children": []
                },
                {
                  "text": "statement substatement\"s agent \"mbox\" should pass",
                  "children": []
                },
                {
                  "text": "statement substatement\"s agent \"mbox_sha1sum\" should pass",
                  "children": []
                },
                {
                  "text": "statement substatement\"s agent \"openid\" should pass",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor without \"account\", \"mbox\", \"mbox_sha1sum\", \"openid\" should fail",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor \"account\" should pass",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor \"mbox\" should pass",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor \"mbox_sha1sum\" should pass",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor \"openid\" should pass",
                  "children": []
                }
              ]
            },
            {
              "text": "An Agent is defined by \"objectType\" of an \"actor\" property or \"object\" property with value \"Agent\"",
              "children": [
                {
                  "text": "statement actor does not require objectType",
                  "children": []
                },
                {
                  "text": "statement actor \"objectType\" accepts \"Agent\"",
                  "children": []
                },
                {
                  "text": "statement authority \"objectType\" accepts \"Agent\"",
                  "children": []
                },
                {
                  "text": "statement context instructor \"objectType\" accepts \"Agent\"",
                  "children": []
                },
                {
                  "text": "statement substatement as agent \"objectType\" accepts \"Agent\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s agent \"objectType\" accepts \"Agent\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor \"objectType\" accepts \"Agent\"",
                  "children": []
                }
              ]
            },
            {
              "text": "An Agent does not use the \"mbox\" property if \"mbox_sha1sum\", \"openid\", or \"account\" are used",
              "children": [
                {
                  "text": "statement actor \"mbox\" cannot be used with \"account\"",
                  "children": []
                },
                {
                  "text": "statement actor \"mbox\" cannot be used with \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement actor \"mbox\" cannot be used with \"openid\"",
                  "children": []
                },
                {
                  "text": "statement authority \"mbox\" cannot be used with \"account\"",
                  "children": []
                },
                {
                  "text": "statement authority \"mbox\" cannot be used with \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement authority \"mbox\" cannot be used with \"openid\"",
                  "children": []
                },
                {
                  "text": "statement context instructor \"mbox\" cannot be used with \"account\"",
                  "children": []
                },
                {
                  "text": "statement context instructor \"mbox\" cannot be used with \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement context instructor \"mbox\" cannot be used with \"openid\"",
                  "children": []
                },
                {
                  "text": "statement substatement as agent \"mbox\" cannot be used with \"account\"",
                  "children": []
                },
                {
                  "text": "statement substatement as agent \"mbox\" cannot be used with \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement substatement as agent \"mbox\" cannot be used with \"openid\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s agent \"mbox\" cannot be used with \"account\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s agent \"mbox\" cannot be used with \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s agent \"mbox\" cannot be used with \"openid\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor \"mbox\" cannot be used with \"account\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor \"mbox\" cannot be used with \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor \"mbox\" cannot be used with \"openid\"",
                  "children": []
                }
              ]
            },
            {
              "text": "An Agent does not use the \"mbox_sha1sum\" property if \"mbox\", \"openid\", or \"account\" are used",
              "children": [
                {
                  "text": "statement actor \"mbox_sha1sum\" cannot be used with \"account\"",
                  "children": []
                },
                {
                  "text": "statement actor \"mbox_sha1sum\" cannot be used with \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement actor \"mbox_sha1sum\" cannot be used with \"openid\"",
                  "children": []
                },
                {
                  "text": "statement authority \"mbox_sha1sum\" cannot be used with \"account\"",
                  "children": []
                },
                {
                  "text": "statement authority \"mbox_sha1sum\" cannot be used with \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement authority \"mbox_sha1sum\" cannot be used with \"openid\"",
                  "children": []
                },
                {
                  "text": "statement context instructor \"mbox_sha1sum\" cannot be used with \"account\"",
                  "children": []
                },
                {
                  "text": "statement context instructor \"mbox_sha1sum\" cannot be used with \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement context instructor \"mbox_sha1sum\" cannot be used with \"openid\"",
                  "children": []
                },
                {
                  "text": "statement substatement as agent \"mbox_sha1sum\" cannot be used with \"account\"",
                  "children": []
                },
                {
                  "text": "statement substatement as agent \"mbox_sha1sum\" cannot be used with \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement substatement as agent \"mbox_sha1sum\" cannot be used with \"openid\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s agent \"mbox_sha1sum\" cannot be used with \"account\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s agent \"mbox_sha1sum\" cannot be used with \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s agent \"mbox_sha1sum\" cannot be used with \"openid\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor \"mbox_sha1sum\" cannot be used with \"account\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor \"mbox_sha1sum\" cannot be used with \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor \"mbox_sha1sum\" cannot be used with \"openid\"",
                  "children": []
                }
              ]
            },
            {
              "text": "An Agent does not use the \"account\" property if \"mbox\", \"mbox_sha1sum\", or \"openid\" are used",
              "children": [
                {
                  "text": "statement actor \"account\" cannot be used with \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement actor \"account\" cannot be used with \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement actor \"account\" cannot be used with \"openid\"",
                  "children": []
                },
                {
                  "text": "statement authority \"account\" cannot be used with \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement authority \"account\" cannot be used with \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement authority \"account\" cannot be used with \"openid\"",
                  "children": []
                },
                {
                  "text": "statement context instructor \"account\" cannot be used with \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement context instructor \"account\" cannot be used with \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement context instructor \"account\" cannot be used with \"openid\"",
                  "children": []
                },
                {
                  "text": "statement substatement as agent \"account\" cannot be used with \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement substatement as agent \"account\" cannot be used with \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement substatement as agent \"account\" cannot be used with \"openid\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s agent \"account\" cannot be used with \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s agent \"account\" cannot be used with \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s agent \"account\" cannot be used with \"openid\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor \"account\" cannot be used with \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor \"account\" cannot be used with \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor \"account\" cannot be used with \"openid\"",
                  "children": []
                }
              ]
            },
            {
              "text": "An Agent does not use the \"openid\" property if \"mbox\", \"mbox_sha1sum\", or \"account\" are used",
              "children": [
                {
                  "text": "statement actor \"openid\" cannot be used with \"account\"",
                  "children": []
                },
                {
                  "text": "statement actor \"openid\" cannot be used with \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement actor \"openid\" cannot be used with \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement authority \"openid\" cannot be used with \"account\"",
                  "children": []
                },
                {
                  "text": "statement authority \"openid\" cannot be used with \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement authority \"openid\" cannot be used with \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement context instructor \"openid\" cannot be used with \"account\"",
                  "children": []
                },
                {
                  "text": "statement context instructor \"openid\" cannot be used with \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement context instructor \"openid\" cannot be used with \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement substatement as agent \"openid\" cannot be used with \"account\"",
                  "children": []
                },
                {
                  "text": "statement substatement as agent \"openid\" cannot be used with \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement substatement as agent \"openid\" cannot be used with \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s agent \"openid\" cannot be used with \"account\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s agent \"openid\" cannot be used with \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s agent \"openid\" cannot be used with \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor \"openid\" cannot be used with \"account\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor \"openid\" cannot be used with \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor \"openid\" cannot be used with \"mbox_sha1sum\"",
                  "children": []
                }
              ]
            },
            {
              "text": "An Anonymous Group uses the \"member\" property",
              "children": [
                {
                  "text": "statement actor anonymous group missing member",
                  "children": []
                },
                {
                  "text": "statement authority anonymous group missing member",
                  "children": []
                },
                {
                  "text": "statement context instructor anonymous group missing member",
                  "children": []
                },
                {
                  "text": "statement context team anonymous group missing member",
                  "children": []
                },
                {
                  "text": "statement substatement as group anonymous group missing member",
                  "children": []
                },
                {
                  "text": "statement substatement\"s group anonymous group missing member",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor anonymous group missing member",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context team anonymous group missing member",
                  "children": []
                }
              ]
            },
            {
              "text": "The \"member\" property is an array of Objects following Agent requirements",
              "children": [
                {
                  "text": "statement actor requires member type \"array\"",
                  "children": []
                },
                {
                  "text": "statement authority requires member type \"array\"",
                  "children": []
                },
                {
                  "text": "statement context instructor requires member type \"array\"",
                  "children": []
                },
                {
                  "text": "statement context team requires member type \"array\"",
                  "children": []
                },
                {
                  "text": "statement substatement as group requires member type \"array\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s group requires member type \"array\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor requires member type \"array\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context team requires member type \"array\"",
                  "children": []
                }
              ]
            },
            {
              "text": "An Identified Group is defined by \"objectType\" of an \"actor\" or \"object\" with value \"Group\" and by one of \"mbox\", \"mbox_sha1sum\", \"openid\", or \"account\" being used",
              "children": [
                {
                  "text": "statement actor identified group accepts \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement actor identified group accepts \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement actor identified group accepts \"openid\"",
                  "children": []
                },
                {
                  "text": "statement actor identified group accepts \"account\"",
                  "children": []
                },
                {
                  "text": "statement context instructor identified group accepts \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement context instructor identified group accepts \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement context instructor identified group accepts \"openid\"",
                  "children": []
                },
                {
                  "text": "statement context instructor identified group accepts \"account\"",
                  "children": []
                },
                {
                  "text": "statement context team identified group accepts \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement context team identified group accepts \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement context team identified group accepts \"openid\"",
                  "children": []
                },
                {
                  "text": "statement context team identified group accepts \"account\"",
                  "children": []
                },
                {
                  "text": "statement substatement as group identified group accepts \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement substatement as group identified group accepts \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement substatement as group identified group accepts \"openid\"",
                  "children": []
                },
                {
                  "text": "statement substatement as group identified group accepts \"account\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s group identified group accepts \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s group identified group accepts \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s group identified group accepts \"openid\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s group identified group accepts \"account\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor identified group accepts \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor identified group accepts \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor identified group accepts \"openid\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor identified group accepts \"account\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context team identified group accepts \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context team identified group accepts \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context team identified group accepts \"openid\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context team identified group accepts \"account\"",
                  "children": []
                }
              ]
            },
            {
              "text": "An Identified Group uses one of the following properties: \"mbox\", \"mbox_sha1sum\", \"openid\", \"account\"",
              "children": [
                {
                  "text": "statement actor identified group accepts \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement actor identified group accepts \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement actor identified group accepts \"openid\"",
                  "children": []
                },
                {
                  "text": "statement actor identified group accepts \"account\"",
                  "children": []
                },
                {
                  "text": "statement context instructor identified group accepts \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement context instructor identified group accepts \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement context instructor identified group accepts \"openid\"",
                  "children": []
                },
                {
                  "text": "statement context instructor identified group accepts \"account\"",
                  "children": []
                },
                {
                  "text": "statement context team identified group accepts \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement context team identified group accepts \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement context team identified group accepts \"openid\"",
                  "children": []
                },
                {
                  "text": "statement context team identified group accepts \"account\"",
                  "children": []
                },
                {
                  "text": "statement substatement as group identified group accepts \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement substatement as group identified group accepts \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement substatement as group identified group accepts \"openid\"",
                  "children": []
                },
                {
                  "text": "statement substatement as group identified group accepts \"account\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s group identified group accepts \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s group identified group accepts \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s group identified group accepts \"openid\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s group identified group accepts \"account\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor identified group accepts \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor identified group accepts \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor identified group accepts \"openid\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor identified group accepts \"account\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context team identified group accepts \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context team identified group accepts \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context team identified group accepts \"openid\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context team identified group accepts \"account\"",
                  "children": []
                }
              ]
            },
            {
              "text": "An Identified Group does not use the \"mbox\" property if \"mbox_sha1sum\", \"openid\", or \"account\" are used",
              "children": [
                {
                  "text": "statement actor \"mbox\" cannot be used with \"account\"",
                  "children": []
                },
                {
                  "text": "statement actor \"mbox\" cannot be used with \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement actor \"mbox\" cannot be used with \"openid",
                  "children": []
                },
                {
                  "text": "statement authority \"mbox\" cannot be used with \"account\"",
                  "children": []
                },
                {
                  "text": "statement authority \"mbox\" cannot be used with \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement authority \"mbox\" cannot be used with \"openid\"",
                  "children": []
                },
                {
                  "text": "statement context instructor \"mbox\" cannot be used with \"account\"",
                  "children": []
                },
                {
                  "text": "statement context instructor \"mbox\" cannot be used with \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement context instructor \"mbox\" cannot be used with \"openid\"",
                  "children": []
                },
                {
                  "text": "statement context team \"mbox\" cannot be used with \"account\"",
                  "children": []
                },
                {
                  "text": "statement context team \"mbox\" cannot be used with \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement context team \"mbox\" cannot be used with \"openid\"",
                  "children": []
                },
                {
                  "text": "statement substatement as group \"mbox\" cannot be used with \"account\"",
                  "children": []
                },
                {
                  "text": "statement substatement as group \"mbox\" cannot be used with \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement substatement as group \"mbox\" cannot be used with \"openid\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s agent \"mbox\" cannot be used with \"account\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s agent \"mbox\" cannot be used with \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s agent \"mbox\" cannot be used with \"openid\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor \"mbox\" cannot be used with \"account\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor \"mbox\" cannot be used with \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor \"mbox\" cannot be used with \"openid\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context team \"mbox\" cannot be used with \"account\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context team \"mbox\" cannot be used with \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context team \"mbox\" cannot be used with \"openid\"",
                  "children": []
                }
              ]
            },
            {
              "text": "An Identified Group does not use the \"mbox_sha1sum\" property if \"mbox\", \"openid\", or \"account\" are used",
              "children": [
                {
                  "text": "statement actor \"mbox_sha1sum\" cannot be used with \"account\"",
                  "children": []
                },
                {
                  "text": "statement actor \"mbox_sha1sum\" cannot be used with \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement actor \"mbox_sha1sum\" cannot be used with \"openid",
                  "children": []
                },
                {
                  "text": "statement authority \"mbox_sha1sum\" cannot be used with \"account\"",
                  "children": []
                },
                {
                  "text": "statement authority \"mbox_sha1sum\" cannot be used with \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement authority \"mbox_sha1sum\" cannot be used with \"openid\"",
                  "children": []
                },
                {
                  "text": "statement context instructor \"mbox_sha1sum\" cannot be used with \"account\"",
                  "children": []
                },
                {
                  "text": "statement context instructor \"mbox_sha1sum\" cannot be used with \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement context team \"mbox_sha1sum\" cannot be used with \"openid\"",
                  "children": []
                },
                {
                  "text": "statement context team \"mbox_sha1sum\" cannot be used with \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement context team \"mbox_sha1sum\" cannot be used with \"openid\"",
                  "children": []
                },
                {
                  "text": "statement substatement as group \"mbox_sha1sum\" cannot be used with \"account\"",
                  "children": []
                },
                {
                  "text": "statement substatement as group \"mbox_sha1sum\" cannot be used with \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement substatement as group \"mbox_sha1sum\" cannot be used with \"openid\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s agent \"mbox_sha1sum\" cannot be used with \"account\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s agent \"mbox_sha1sum\" cannot be used with \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s agent \"mbox_sha1sum\" cannot be used with \"openid\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor \"mbox_sha1sum\" cannot be used with \"account\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor \"mbox_sha1sum\" cannot be used with \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor \"mbox_sha1sum\" cannot be used with \"openid\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context team \"mbox_sha1sum\" cannot be used with \"account\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context team \"mbox_sha1sum\" cannot be used with \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context team \"mbox_sha1sum\" cannot be used with \"openid\"",
                  "children": []
                }
              ]
            },
            {
              "text": "An Identified Group does not use the \"openid\" property if \"mbox\", \"mbox_sha1sum\", or \"account\" are used",
              "children": [
                {
                  "text": "statement actor \"openid\" cannot be used with \"account",
                  "children": []
                },
                {
                  "text": "statement actor \"openid\" cannot be used with \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement actor \"openid\" cannot be used with \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement authority \"openid\" cannot be used with \"account\"",
                  "children": []
                },
                {
                  "text": "statement authority \"openid\" cannot be used with \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement authority \"openid\" cannot be used with \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement context instructor \"openid\" cannot be used with \"account\"",
                  "children": []
                },
                {
                  "text": "statement context instructor \"openid\" cannot be used with \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement context instructor \"openid\" cannot be used with \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement context team \"openid\" cannot be used with \"account\"",
                  "children": []
                },
                {
                  "text": "statement context team \"openid\" cannot be used with \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement context team \"openid\" cannot be used with \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement substatement as group \"openid\" cannot be used with \"account\"",
                  "children": []
                },
                {
                  "text": "statement substatement as group \"openid\" cannot be used with \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement substatement as group \"openid\" cannot be used with \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s agent \"openid\" cannot be used with \"account\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s agent \"openid\" cannot be used with \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s agent \"openid\" cannot be used with \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor \"openid\" cannot be used with \"account\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor \"openid\" cannot be used with \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor \"openid\" cannot be used with \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context team \"openid\" cannot be used with \"account\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context team \"openid\" cannot be used with \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context team \"openid\" cannot be used with \"mbox_sha1sum\"",
                  "children": []
                }
              ]
            },
            {
              "text": "An Identified Group does not use the \"account\" property if \"mbox\", \"mbox_sha1sum\", or \"openid\" are used",
              "children": [
                {
                  "text": "statement actor \"account\" cannot be used with \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement actor \"account\" cannot be used with \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement actor \"account\" cannot be used with \"openid",
                  "children": []
                },
                {
                  "text": "statement authority \"account\" cannot be used with \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement authority \"account\" cannot be used with \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement authority \"account\" cannot be used with \"openid\"",
                  "children": []
                },
                {
                  "text": "statement context instructor \"account\" cannot be used with \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement context instructor \"account\" cannot be used with \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement context instructor \"account\" cannot be used with \"openid\"",
                  "children": []
                },
                {
                  "text": "statement context team \"account\" cannot be used with \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement context team \"account\" cannot be used with \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement context team \"account\" cannot be used with \"openid\"",
                  "children": []
                },
                {
                  "text": "statement substatement as group \"account\" cannot be used with \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement substatement as group \"account\" cannot be used with \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement substatement as group \"account\" cannot be used with \"openid\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s agent \"account\" cannot be used with \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s agent \"account\" cannot be used with \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s agent \"account\" cannot be used with \"openid\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor \"account\" cannot be used with \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor \"account\" cannot be used with \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor \"account\" cannot be used with \"openid\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context team \"account\" cannot be used with \"mbox\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context team \"account\" cannot be used with \"mbox_sha1sum\"",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context team \"account\" cannot be used with \"openid\"",
                  "children": []
                }
              ]
            },
            {
              "text": "An \"mbox\" property has the form \"mailto:email address\" and is an IRI",
              "children": [
                {
                  "text": "statement actor \"agent mbox\" not IRI",
                  "children": []
                },
                {
                  "text": "statement actor \"group mbox\" not IRI",
                  "children": []
                },
                {
                  "text": "statement authority \"agent mbox\" not IRI",
                  "children": []
                },
                {
                  "text": "statement authority \"group mbox\" not IRI",
                  "children": []
                },
                {
                  "text": "statement context instructor \"agent mbox\" not IRI",
                  "children": []
                },
                {
                  "text": "statement context instructor \"group mbox\" not IRI",
                  "children": []
                },
                {
                  "text": "statement context team \"group mbox\" not IRI",
                  "children": []
                },
                {
                  "text": "statement substatement as \"agent mbox\" not IRI",
                  "children": []
                },
                {
                  "text": "statement substatement as \"group mbox\" not IRI",
                  "children": []
                },
                {
                  "text": "statement substatement\"s \"agent mbox\" not IRI",
                  "children": []
                },
                {
                  "text": "statement substatement\"s \"group mbox\" not IRI",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor \"agent mbox\" not IRI",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor \"group mbox\" not IRI",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context team \"group mbox\" not IRI",
                  "children": []
                },
                {
                  "text": "statement actor \"agent mbox\" not mailto:email address",
                  "children": []
                },
                {
                  "text": "statement actor \"group mbox\" not mailto:email address",
                  "children": []
                },
                {
                  "text": "statement authority \"agent mbox\" not mailto:email address",
                  "children": []
                },
                {
                  "text": "statement authority \"group mbox\" not mailto:email address",
                  "children": []
                },
                {
                  "text": "statement context instructor \"agent mbox\" not mailto:email address",
                  "children": []
                },
                {
                  "text": "statement context instructor \"group mbox\" not mailto:email address",
                  "children": []
                },
                {
                  "text": "statement context team \"group mbox\" not mailto:email address",
                  "children": []
                },
                {
                  "text": "statement substatement as \"agent mbox\" not mailto:email address",
                  "children": []
                },
                {
                  "text": "statement substatement as \"group mbox\" not mailto:email address",
                  "children": []
                },
                {
                  "text": "statement substatement\"s \"agent mbox\" not mailto:email address",
                  "children": []
                },
                {
                  "text": "statement substatement\"s \"group mbox\" not mailto:email address",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor \"agent mbox\" not mailto:email address",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor \"group mbox\" not mailto:email address",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context team \"group mbox\" not mailto:email address",
                  "children": []
                }
              ]
            },
            {
              "text": "An \"mbox_sha1sum\" property is a String",
              "children": [
                {
                  "text": "statement actor \"agent mbox_sha1sum\" not string",
                  "children": []
                },
                {
                  "text": "statement actor \"group mbox_sha1sum\" not string",
                  "children": []
                },
                {
                  "text": "statement authority \"agent mbox_sha1sum\" not string",
                  "children": []
                },
                {
                  "text": "statement authority \"group mbox_sha1sum\" not string",
                  "children": []
                },
                {
                  "text": "statement context instructor \"agent mbox_sha1sum\" not string",
                  "children": []
                },
                {
                  "text": "statement context instructor \"group mbox_sha1sum\" not string",
                  "children": []
                },
                {
                  "text": "statement context team \"group mbox_sha1sum\" not string",
                  "children": []
                },
                {
                  "text": "statement substatement as \"agent mbox_sha1sum\" not string",
                  "children": []
                },
                {
                  "text": "statement substatement as \"group mbox_sha1sum\" not string",
                  "children": []
                },
                {
                  "text": "statement substatement\"s \"agent mbox_sha1sum\" not string",
                  "children": []
                },
                {
                  "text": "statement substatement\"s \"group mbox_sha1sum\" not string",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor \"agent mbox_sha1sum\" not string",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor \"group mbox_sha1sum\" not string",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context team \"group mbox_sha1sum\" not string",
                  "children": []
                }
              ]
            },
            {
              "text": "An \"openid\" property is a URI",
              "children": [
                {
                  "text": "statement actor \"agent openid\" not URI",
                  "children": []
                },
                {
                  "text": "statement actor \"group openid\" not URI",
                  "children": []
                },
                {
                  "text": "statement authority \"agent openid\" not URI",
                  "children": []
                },
                {
                  "text": "statement authority \"group openid\" not URI",
                  "children": []
                },
                {
                  "text": "statement context instructor \"agent openid\" not URI",
                  "children": []
                },
                {
                  "text": "statement context instructor \"group openid\" not URI",
                  "children": []
                },
                {
                  "text": "statement context team \"group openid\" not URI",
                  "children": []
                },
                {
                  "text": "statement substatement as \"agent openid\" not URI",
                  "children": []
                },
                {
                  "text": "statement substatement as \"group openid\" not URI",
                  "children": []
                },
                {
                  "text": "statement substatement\"s \"agent openid\" not URI",
                  "children": []
                },
                {
                  "text": "statement substatement\"s \"group openid\" not URI",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor \"agent openid\" not URI",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor \"group openid\" not URI",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context team \"group openid\" not URI",
                  "children": []
                }
              ]
            },
            {
              "text": "An Account Object is the \"account\" property of a Group or Agent",
              "children": [
                {
                  "text": "statement actor \"agent account\" property exists",
                  "children": []
                },
                {
                  "text": "statement actor \"group account\" property exists",
                  "children": []
                },
                {
                  "text": "statement authority \"agent account\" property exists",
                  "children": []
                },
                {
                  "text": "statement authority \"group account\" property exists",
                  "children": []
                },
                {
                  "text": "statement context instructor \"agent account\" property exists",
                  "children": []
                },
                {
                  "text": "statement context instructor \"group account\" property exists",
                  "children": []
                },
                {
                  "text": "statement context team \"group account\" property exists",
                  "children": []
                },
                {
                  "text": "statement substatement as \"agent account\" property exists",
                  "children": []
                },
                {
                  "text": "statement substatement as \"group account\" property exists",
                  "children": []
                },
                {
                  "text": "statement substatement\"s \"agent account\" property exists",
                  "children": []
                },
                {
                  "text": "statement substatement\"s \"group account\" property exists",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor \"agent account\" property exists",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor \"group account\" property exists",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context team \"group account\" property exists",
                  "children": []
                }
              ]
            },
            {
              "text": "An Account Object uses the \"homePage\" property",
              "children": [
                {
                  "text": "statement actor \"agent\" account \"homePage\" property exists",
                  "children": []
                },
                {
                  "text": "statement actor \"group\" account \"homePage\" property exists",
                  "children": []
                },
                {
                  "text": "statement authority \"agent\" account \"homePage\" property exists",
                  "children": []
                },
                {
                  "text": "statement authority \"group\" account \"homePage\" property exists",
                  "children": []
                },
                {
                  "text": "statement context instructor \"agent\" account \"homePage\" property exists",
                  "children": []
                },
                {
                  "text": "statement context instructor \"group\" account \"homePage\" property exists",
                  "children": []
                },
                {
                  "text": "statement context team \"group\" account \"homePage\" property exists",
                  "children": []
                },
                {
                  "text": "statement substatement as \"agent\" account \"homePage\" property exists",
                  "children": []
                },
                {
                  "text": "statement substatement as \"group\" account \"homePage\" property exists",
                  "children": []
                },
                {
                  "text": "statement substatement\"s \"agent\" account \"homePage\" property exists",
                  "children": []
                },
                {
                  "text": "statement substatement\"s \"group\" account \"homePage\" property exists",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor \"agent\" account \"homePage\" property exists",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor \"group\" account \"homePage\" property exists",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context team \"group\" account \"homePage\" property exists",
                  "children": []
                }
              ]
            },
            {
              "text": "An Account Object's \"homePage\" property is an IRL",
              "children": [
                {
                  "text": "statement actor \"agent\" account \"homePage property is IRL",
                  "children": []
                },
                {
                  "text": "statement actor \"group\" account \"homePage property is IRL",
                  "children": []
                },
                {
                  "text": "statement authority \"agent\" account \"homePage property is IRL",
                  "children": []
                },
                {
                  "text": "statement authority \"group\" account \"homePage property is IRL",
                  "children": []
                },
                {
                  "text": "statement context instructor \"agent\" account \"homePage property is IRL",
                  "children": []
                },
                {
                  "text": "statement context instructor \"group\" account \"homePage property is IRL",
                  "children": []
                },
                {
                  "text": "statement context team \"group\" account \"homePage property is IRL",
                  "children": []
                },
                {
                  "text": "statement substatement as \"agent\" account \"homePage property is IRL",
                  "children": []
                },
                {
                  "text": "statement substatement as \"group\" account \"homePage property is IRL",
                  "children": []
                },
                {
                  "text": "statement substatement\"s \"agent\" account \"homePage property is IRL",
                  "children": []
                },
                {
                  "text": "statement substatement\"s \"group\" account \"homePage property is IRL",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor \"agent\" account \"homePage property is IRL",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor \"group\" account \"homePage property is IRL",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context team \"group\" account \"homePage property is IRL",
                  "children": []
                }
              ]
            },
            {
              "text": "An Account Object uses the \"name\" property",
              "children": [
                {
                  "text": "statement actor \"agent\" account \"name\" property exists",
                  "children": []
                },
                {
                  "text": "statement actor \"group\" account \"name\" property exists",
                  "children": []
                },
                {
                  "text": "statement authority \"agent\" account \"name\" property exists",
                  "children": []
                },
                {
                  "text": "statement authority \"group\" account \"name\" property exists",
                  "children": []
                },
                {
                  "text": "statement context instructor \"agent\" account \"name\" property exists",
                  "children": []
                },
                {
                  "text": "statement context instructor \"group\" account \"name\" property exists",
                  "children": []
                },
                {
                  "text": "statement context team \"group\" account \"name\" property exists",
                  "children": []
                },
                {
                  "text": "statement substatement as \"agent\" account \"name\" property exists",
                  "children": []
                },
                {
                  "text": "statement substatement as \"group\" account \"name\" property exists",
                  "children": []
                },
                {
                  "text": "statement substatement\"s \"agent\" account \"name\" property exists",
                  "children": []
                },
                {
                  "text": "statement substatement\"s \"group\" account \"name\" property exists",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor \"agent\" account \"name\" property exists",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor \"group\" account \"name\" property exists",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context team \"group\" account \"name\" property exists",
                  "children": []
                }
              ]
            }
          ]
        },
        {
          "text": "Verb Property Requirements",
          "children": [
            {
              "text": "A \"verb\" property contains an \"id\" property",
              "children": [
                {
                  "text": "statement verb missing \"id\"",
                  "children": []
                },
                {
                  "text": "statement substatement verb missing \"id\"",
                  "children": []
                }
              ]
            },
            {
              "text": "A \"verb\" property's \"id\" property is an IRI",
              "children": [
                {
                  "text": "statement verb \"id\" not IRI",
                  "children": []
                },
                {
                  "text": "statement substatement verb \"id\" not IRI",
                  "children": []
                }
              ]
            },
            {
              "text": "A \"verb\" property's \"display\" property is a Language Map",
              "children": [
                {
                  "text": "statement verb \"display\" is numeric",
                  "children": []
                },
                {
                  "text": "statement verb \"display\" is string",
                  "children": []
                },
                {
                  "text": "statement substatement verb \"display\" is numeric",
                  "children": []
                },
                {
                  "text": "statement substatement verb \"display\" is string",
                  "children": []
                }
              ]
            }
          ]
        },
        {
          "text": "Object Property Requirements",
          "children": [
            {
              "text": "An \"object\" property's \"objectType\" property is either \"Activity\", \"Agent\", \"Group\", \"SubStatement\", or \"StatementRef\"",
              "children": [
                {
                  "text": "statement activity should fail on \"activity\"",
                  "children": []
                },
                {
                  "text": "statement substatement activity should fail on \"activity\"",
                  "children": []
                },
                {
                  "text": "statement agent template should fail on \"agent\"",
                  "children": []
                },
                {
                  "text": "statement substatement agent should fail on \"agent\"",
                  "children": []
                },
                {
                  "text": "statement group should fail on \"group\"",
                  "children": []
                },
                {
                  "text": "statement substatement group should fail on \"group\"",
                  "children": []
                },
                {
                  "text": "statement StatementRef should fail on \"statementref\"",
                  "children": []
                },
                {
                  "text": "statement substatement StatementRef should fail on \"statementref\"",
                  "children": []
                },
                {
                  "text": "statement SubStatement should fail on \"substatement\"",
                  "children": []
                }
              ]
            },
            {
              "text": "An \"object\" property uses the \"id\" property exactly one time",
              "children": [
                {
                  "text": "statement activity \"id\" not provided",
                  "children": []
                },
                {
                  "text": "statement substatement activity \"id\" not provided",
                  "children": []
                }
              ]
            },
            {
              "text": "An \"object\" property's \"id\" property is an IRI",
              "children": [
                {
                  "text": "statement activity \"id\" not IRI",
                  "children": []
                },
                {
                  "text": "statement activity \"id\" is IRI",
                  "children": []
                },
                {
                  "text": "statement substatement activity \"id\" not IRI",
                  "children": []
                },
                {
                  "text": "statement substatement activity \"id\" is IRI",
                  "children": []
                }
              ]
            },
            {
              "text": "An Activity's \"definition\" property is an Object",
              "children": [
                {
                  "text": "statement activity \"definition\" not object",
                  "children": []
                },
                {
                  "text": "statement substatement activity \"definition\" not object",
                  "children": []
                }
              ]
            },
            {
              "text": "An Activity Definition's \"name\" property is a Language Map",
              "children": [
                {
                  "text": "statement object \"name\" language map is numeric",
                  "children": []
                },
                {
                  "text": "statement object \"name\" language map is string",
                  "children": []
                },
                {
                  "text": "statement substatement activity \"name\" language map is numeric",
                  "children": []
                },
                {
                  "text": "statement substatement activity \"name\" language map is string",
                  "children": []
                }
              ]
            },
            {
              "text": "An Activity Definition's \"description\" property is a Language Map",
              "children": [
                {
                  "text": "statement object \"description\" language map is numeric",
                  "children": []
                },
                {
                  "text": "statement object \"description\" language map is string",
                  "children": []
                },
                {
                  "text": "statement substatement activity \"description\" language map is numeric",
                  "children": []
                },
                {
                  "text": "statement substatement activity \"description\" language map is string",
                  "children": []
                }
              ]
            },
            {
              "text": "An Activity Definition's \"type\" property is an IRI",
              "children": [
                {
                  "text": "statement activity \"type\" not IRI",
                  "children": []
                },
                {
                  "text": "statement substatement activity \"type\" not IRI",
                  "children": []
                }
              ]
            },
            {
              "text": "An Activity Definition's \"moreinfo\" property is an IRL",
              "children": [
                {
                  "text": "statement activity \"moreInfo\" not IRI",
                  "children": []
                },
                {
                  "text": "statement substatement activity \"moreInfo\" not IRI",
                  "children": []
                }
              ]
            },
            {
              "text": "An Activity Definition's \"interactionType\" property is a String with a value of either “true-false”, “choice”, “fill-in”, “long-fill-in”, “matching”, “performance”, “sequencing”, “likert”, “numeric” or “other”",
              "children": [
                {
                  "text": "statement activity \"interactionType\" can be used with \"true-false\"",
                  "children": []
                },
                {
                  "text": "statement activity \"interactionType\" can be used with \"choice\"",
                  "children": []
                },
                {
                  "text": "statement activity \"interactionType\" can be used with \"fill-in\"",
                  "children": []
                },
                {
                  "text": "statement activity \"interactionType\" can be used with \"long-fill-in\"",
                  "children": []
                },
                {
                  "text": "statement activity \"interactionType\" can be used with \"matching\"",
                  "children": []
                },
                {
                  "text": "statement activity \"interactionType\" can be used with \"performance\"",
                  "children": []
                },
                {
                  "text": "statement activity \"interactionType\" can be used with \"sequencing\"",
                  "children": []
                },
                {
                  "text": "statement activity \"interactionType\" can be used with \"likert\"",
                  "children": []
                },
                {
                  "text": "statement activity \"interactionType\" can be used with \"numeric\"",
                  "children": []
                },
                {
                  "text": "statement activity \"interactionType\" can be used with \"other\"",
                  "children": []
                },
                {
                  "text": "statement activity \"interactionType\" fails with invalid iri",
                  "children": []
                },
                {
                  "text": "statement activity \"interactionType\" fails with invalid numeric",
                  "children": []
                },
                {
                  "text": "statement activity \"interactionType\" fails with invalid object",
                  "children": []
                },
                {
                  "text": "statement activity \"interactionType\" fails with invalid string",
                  "children": []
                },
                {
                  "text": "statement substatement activity \"interactionType\" can be used with \"true-false\"",
                  "children": []
                },
                {
                  "text": "statement substatement activity \"interactionType\" can be used with \"choice\"",
                  "children": []
                },
                {
                  "text": "statement substatement activity \"interactionType\" can be used with \"fill-in\"",
                  "children": []
                },
                {
                  "text": "statement substatement activity \"interactionType\" can be used with \"long-fill-in\"",
                  "children": []
                },
                {
                  "text": "statement substatement activity \"interactionType\" can be used with \"matching\"",
                  "children": []
                },
                {
                  "text": "statement substatement activity \"interactionType\" can be used with \"performance\"",
                  "children": []
                },
                {
                  "text": "statement substatement activity \"interactionType\" can be used with \"sequencing\"",
                  "children": []
                },
                {
                  "text": "statement substatement activity \"interactionType\" can be used with \"likert\"",
                  "children": []
                },
                {
                  "text": "statement substatement activity \"interactionType\" can be used with \"numeric\"",
                  "children": []
                },
                {
                  "text": "statement substatement activity \"interactionType\" can be used with \"other\"",
                  "children": []
                },
                {
                  "text": "statement substatement activity \"interactionType\" fails with invalid iri",
                  "children": []
                },
                {
                  "text": "statement substatement activity \"interactionType\" fails with invalid numeric",
                  "children": []
                },
                {
                  "text": "statement substatement activity \"interactionType\" fails with invalid object",
                  "children": []
                },
                {
                  "text": "statement substatement activity \"interactionType\" fails with invalid string",
                  "children": []
                }
              ]
            },
            {
              "text": "An Activity Definition's \"extension\" property is an Object",
              "children": [
                {
                  "text": "statement activity \"extension\" invalid string",
                  "children": []
                },
                {
                  "text": "statement activity \"extension\" invalid iri",
                  "children": []
                },
                {
                  "text": "statement substatement activity \"extension\" invalid string",
                  "children": []
                },
                {
                  "text": "statement substatement activity \"extension\" invalid iri",
                  "children": []
                }
              ]
            },
            {
              "text": "An Activity Definition uses the \"interactionType\" property if any of the correctResponsesPattern, choices, scale, source, target, or steps properties are used",
              "children": [
                {
                  "text": "Activity Definition uses correctResponsesPattern without \"interactionType\" property",
                  "children": []
                },
                {
                  "text": "Activity Definition uses choices without \"interactionType\" property",
                  "children": []
                },
                {
                  "text": "Activity Definition uses fill-in without \"interactionType\" property",
                  "children": []
                },
                {
                  "text": "Activity Definition uses scale without \"interactionType\" property",
                  "children": []
                },
                {
                  "text": "Activity Definition uses long-fill-in without \"interactionType\" property",
                  "children": []
                },
                {
                  "text": "Activity Definition uses source without \"interactionType\" property",
                  "children": []
                },
                {
                  "text": "Activity Definition uses target without \"interactionType\" property",
                  "children": []
                },
                {
                  "text": "Activity Definition uses numeric without \"interactionType\" property",
                  "children": []
                },
                {
                  "text": "Activity Definition uses other without \"interactionType\" property",
                  "children": []
                },
                {
                  "text": "Activity Definition uses performance without \"interactionType\" property",
                  "children": []
                },
                {
                  "text": "Activity Definition uses sequencing without \"interactionType\" property",
                  "children": []
                },
                {
                  "text": "Activity Definition uses true-false without \"interactionType\" property",
                  "children": []
                }
              ]
            },
            {
              "text": "Statements that use an Agent or Group as an Object MUST specify an \"objectType\" property.",
              "children": [
                {
                  "text": "should fail when using agent as object and no objectType",
                  "children": []
                },
                {
                  "text": "should fail when using group as object and no objectType",
                  "children": []
                },
                {
                  "text": "substatement should fail when using agent as object and no objectType",
                  "children": []
                },
                {
                  "text": "substatement should fail when using group as object and no objectType",
                  "children": []
                }
              ]
            },
            {
              "text": "A Sub-Statement is defined by the \"objectType\" of an \"object\" with value \"SubStatement\"",
              "children": [
                {
                  "text": "substatement invalid when not \"SubStatement\"",
                  "children": []
                }
              ]
            },
            {
              "text": "A Sub-Statement follows the requirements of all Statements",
              "children": [
                {
                  "text": "substatement requires actor",
                  "children": []
                },
                {
                  "text": "substatement requires object",
                  "children": []
                },
                {
                  "text": "substatement requires verb",
                  "children": []
                },
                {
                  "text": "should pass substatement context",
                  "children": []
                },
                {
                  "text": "should pass substatement result",
                  "children": []
                },
                {
                  "text": "should pass substatement statementref",
                  "children": []
                },
                {
                  "text": "should pass substatement as agent",
                  "children": []
                },
                {
                  "text": "should pass substatement as group",
                  "children": []
                }
              ]
            },
            {
              "text": "A Sub-Statement cannot have a Sub-Statement",
              "children": [
                {
                  "text": "substatement invalid nested \"SubStatement\"",
                  "children": []
                }
              ]
            },
            {
              "text": "A Sub-Statement cannot use the \"id\" property at the Statement level",
              "children": [
                {
                  "text": "substatement invalid with property \"id\"",
                  "children": []
                }
              ]
            },
            {
              "text": "A Sub-Statement cannot use the \"stored\" property",
              "children": [
                {
                  "text": "substatement invalid with property \"stored\"",
                  "children": []
                }
              ]
            },
            {
              "text": "A Sub-Statement cannot use the \"version\" property",
              "children": [
                {
                  "text": "substatement invalid with property \"version\"",
                  "children": []
                }
              ]
            },
            {
              "text": "A Sub-Statement cannot use the \"authority\" property",
              "children": [
                {
                  "text": "substatement invalid with property \"authority\"",
                  "children": []
                }
              ]
            },
            {
              "text": "A Statement Reference is defined by the \"objectType\" of an \"object\" with value \"StatementRef\"",
              "children": [
                {
                  "text": "statementref invalid when not \"StatementRef\"",
                  "children": []
                },
                {
                  "text": "substatement statementref invalid when not \"StatementRef\"",
                  "children": []
                }
              ]
            },
            {
              "text": "A Statement Reference contains an \"id\" property",
              "children": [
                {
                  "text": "statementref invalid when missing \"id\"",
                  "children": []
                },
                {
                  "text": "substatement statementref invalid when missing \"id\"",
                  "children": []
                }
              ]
            },
            {
              "text": "A Statement Reference's \"id\" property is a UUID",
              "children": [
                {
                  "text": "statementref \"id\" not \"uuid\"",
                  "children": []
                },
                {
                  "text": "substatement statementref \"id\" not \"uuid\"",
                  "children": []
                }
              ]
            }
          ]
        },
        {
          "text": "Result Property Requirements",
          "children": [
            {
              "text": "A \"success\" property is a Boolean",
              "children": [
                {
                  "text": "statement result \"success\" property is string \"true\"",
                  "children": []
                },
                {
                  "text": "statement result \"success\" property is string \"false\"",
                  "children": []
                },
                {
                  "text": "statement substatement result \"success\" property is string \"true\"",
                  "children": []
                },
                {
                  "text": "statement substatement result \"success\" property is string \"false\"",
                  "children": []
                }
              ]
            },
            {
              "text": "A \"completion\" property is a Boolean",
              "children": [
                {
                  "text": "statement result \"completion\" property is string \"true\"",
                  "children": []
                },
                {
                  "text": "statement result \"completion\" property is string \"false\"",
                  "children": []
                },
                {
                  "text": "statement substatement result \"completion\" property is string \"true\"",
                  "children": []
                },
                {
                  "text": "statement substatement result \"completion\" property is string \"false\"",
                  "children": []
                }
              ]
            },
            {
              "text": "A \"response\" property is a String",
              "children": [
                {
                  "text": "statement result \"response\" property is numeric",
                  "children": []
                },
                {
                  "text": "statement result \"completion\" property is object",
                  "children": []
                },
                {
                  "text": "statement substatement result \"completion\" property is numeric",
                  "children": []
                },
                {
                  "text": "statement substatement result \"completion\" property is object",
                  "children": []
                }
              ]
            },
            {
              "text": "A \"duration\" property is a formatted to ISO 8601",
              "children": [
                {
                  "text": "statement result \"duration\" property is invalid",
                  "children": []
                },
                {
                  "text": "statement substatement result \"duration\" property is invalid",
                  "children": []
                },
                {
                  "text": "statement result \"duration\" property is valid",
                  "children": []
                },
                {
                  "text": "statement substatement result \"duration\" property is valid",
                  "children": []
                },
                {
                  "text": "statement result \"duration\" property is valid",
                  "children": []
                },
                {
                  "text": "statement substatement result \"duration\" property is valid",
                  "children": []
                },
                {
                  "text": "statement result \"duration\" property is valid",
                  "children": []
                },
                {
                  "text": "statement substatement result \"duration\" property is valid",
                  "children": []
                },
                {
                  "text": "statement result \"duration\" property is valid",
                  "children": []
                }
              ]
            },
            {
              "text": "An \"extensions\" property is an Object",
              "children": [
                {
                  "text": "statement result \"extensions\" property is numeric",
                  "children": []
                },
                {
                  "text": "statement result \"extensions\" property is string",
                  "children": []
                },
                {
                  "text": "statement substatement result \"extensions\" property is numeric",
                  "children": []
                },
                {
                  "text": "statement substatement result \"extensions\" property is string",
                  "children": []
                }
              ]
            },
            {
              "text": "A \"score\" property is an Object",
              "children": [
                {
                  "text": "statement result score numeric",
                  "children": []
                },
                {
                  "text": "statement result score string",
                  "children": []
                },
                {
                  "text": "statement substatement result score numeric",
                  "children": []
                },
                {
                  "text": "statement substatement result score string",
                  "children": []
                }
              ]
            },
            {
              "text": "A \"score\" Object's \"scaled\" property is a decimal number between -1 and 1, inclusive.",
              "children": [
                {
                  "text": "statement result \"scaled\" accepts decimal",
                  "children": []
                },
                {
                  "text": "statement substatement result \"scaled\" accepts decimal",
                  "children": []
                },
                {
                  "text": "statement result \"scaled\" should pass with value 1.0",
                  "children": []
                },
                {
                  "text": "statement substatement result \"scaled\" pass with value -1.0000",
                  "children": []
                },
                {
                  "text": "statement result \"scaled\" should reject with value 1.01",
                  "children": []
                },
                {
                  "text": "statement substatement result \"scaled\" reject with value -1.00001",
                  "children": []
                }
              ]
            },
            {
              "text": "A \"score\" Object's \"raw\" property is a decimal number between min and max, if present and otherwise unrestricted, inclusive",
              "children": [
                {
                  "text": "statement result \"raw\" accepts decimal",
                  "children": []
                },
                {
                  "text": "statement substatement result \"raw\" accepts decimal",
                  "children": []
                },
                {
                  "text": "statement result \"raw\" rejects raw greater than max",
                  "children": []
                },
                {
                  "text": "statement substatement result \"raw\" rejects raw greater than max",
                  "children": []
                },
                {
                  "text": "statement result \"raw\" rejects raw less than min",
                  "children": []
                },
                {
                  "text": "statement substatement result \"raw\" rejects raw less than min",
                  "children": []
                }
              ]
            },
            {
              "text": "A \"score\" Object's \"min\" property is a decimal number less than the \"max\" property, if it is present.",
              "children": [
                {
                  "text": "statement result \"min\" accepts decimal",
                  "children": []
                },
                {
                  "text": "statement substatement result \"min\" accepts decimal",
                  "children": []
                },
                {
                  "text": "statement result \"min\" rejects decimal number greater than \"max\"",
                  "children": []
                },
                {
                  "text": "statement substatement result \"min\" rejects decimal number greater than \"max\"",
                  "children": []
                }
              ]
            },
            {
              "text": "A \"score\" Object's \"max\" property is a Decimal accurate to seven significant decimal figures",
              "children": [
                {
                  "text": "statement result \"max\" accepts a decimal number more than the \"min\" property, if it is present.",
                  "children": []
                },
                {
                  "text": "statement substatement result \"max\" accepts a decimal number more than the \"min\" property, if it is present.",
                  "children": []
                },
                {
                  "text": "statement result \"max\" accepts a decimal number more than the \"min\" property, if it is present.",
                  "children": []
                },
                {
                  "text": "statement substatement result \"max\" accepts a decimal number more than the \"min\" property, if it is present.",
                  "children": []
                }
              ]
            }
          ]
        },
        {
          "text": "Context Property Requirements",
          "children": [
            {
              "text": "A \"registration\" property is a UUID",
              "children": [
                {
                  "text": "statement context \"registration\" is object",
                  "children": []
                },
                {
                  "text": "statement context \"registration\" is string",
                  "children": []
                },
                {
                  "text": "statement substatement context \"registration\" is object",
                  "children": []
                },
                {
                  "text": "statement substatement context \"registration\" is string",
                  "children": []
                }
              ]
            },
            {
              "text": "An \"instructor\" property is an Agent",
              "children": [
                {
                  "text": "statement context \"instructor\" is object",
                  "children": []
                },
                {
                  "text": "statement context \"instructor\" is string",
                  "children": []
                },
                {
                  "text": "statement substatement context \"instructor\" is object",
                  "children": []
                },
                {
                  "text": "statement substatement context \"instructor\" is string",
                  "children": []
                }
              ]
            },
            {
              "text": "An \"team\" property is a Group",
              "children": [
                {
                  "text": "statement context \"team\" is agent",
                  "children": []
                },
                {
                  "text": "statement context \"team\" is object",
                  "children": []
                },
                {
                  "text": "statement context \"team\" is string",
                  "children": []
                },
                {
                  "text": "statement substatement context \"team\" is agent",
                  "children": []
                },
                {
                  "text": "statement substatement context \"team\" is object",
                  "children": []
                },
                {
                  "text": "statement substatement context \"team\" is string",
                  "children": []
                }
              ]
            },
            {
              "text": "A \"contextActivities\" property is an Object",
              "children": [
                {
                  "text": "statement context \"contextActivities\" is string",
                  "children": []
                },
                {
                  "text": "statement substatement context \"contextActivities\" is string",
                  "children": []
                }
              ]
            },
            {
              "text": "A \"revision\" property is a String",
              "children": [
                {
                  "text": "statement context \"revision\" is numeric",
                  "children": []
                },
                {
                  "text": "statement context \"revision\" is object",
                  "children": []
                },
                {
                  "text": "statement substatement context \"revision\" is numeric",
                  "children": []
                },
                {
                  "text": "statement substatement context \"revision\" is object",
                  "children": []
                }
              ]
            },
            {
              "text": "A Statement cannot contain both a \"revision\" property in its \"context\" property and have the value of the \"object\" property's \"objectType\" be anything but \"Activity\"",
              "children": [
                {
                  "text": "statement context \"revision\" is invalid with object agent",
                  "children": []
                },
                {
                  "text": "statement context \"revision\" is invalid with object group",
                  "children": []
                },
                {
                  "text": "statement context \"revision\" is invalid with statementref",
                  "children": []
                },
                {
                  "text": "statement context \"revision\" is invalid with substatement",
                  "children": []
                },
                {
                  "text": "statement context \"revision\" is valid with no ObjectType",
                  "children": []
                },
                {
                  "text": "statement substatement context \"revision\" is invalid with object agent",
                  "children": []
                },
                {
                  "text": "statement substatement context \"revision\" is invalid with object group",
                  "children": []
                },
                {
                  "text": "statement substatement context \"revision\" is invalid with statementref",
                  "children": []
                },
                {
                  "text": "statement substatement context \"revision\" is valid with no objectType",
                  "children": []
                }
              ]
            },
            {
              "text": "A \"platform\" property is a String",
              "children": [
                {
                  "text": "statement context \"platform\" is numeric",
                  "children": []
                },
                {
                  "text": "statement context \"platform\" is object",
                  "children": []
                },
                {
                  "text": "statement substatement context \"platform\" is numeric",
                  "children": []
                },
                {
                  "text": "statement substatement context \"platform\" is object",
                  "children": []
                }
              ]
            },
            {
              "text": "A Statement cannot contain both a \"platform\" property in its \"context\" property and have the value of the \"object\" property's \"objectType\" be anything but \"Activity\"",
              "children": [
                {
                  "text": "statement context \"platform\" is invalid with object agent",
                  "children": []
                },
                {
                  "text": "statement context \"platform\" is invalid with object group",
                  "children": []
                },
                {
                  "text": "statement context \"platform\" is invalid with statementref",
                  "children": []
                },
                {
                  "text": "statement context \"platform\" is invalid with substatement",
                  "children": []
                },
                {
                  "text": "statement context \"platform\" is valid with empty objectType",
                  "children": []
                },
                {
                  "text": "statement substatement context \"platform\" is invalid with object agent",
                  "children": []
                },
                {
                  "text": "statement substatement context \"platform\" is invalid with object group",
                  "children": []
                },
                {
                  "text": "statement substatement context \"platform\" is invalid with statementref",
                  "children": []
                },
                {
                  "text": "statement substatement context \"platform\" is valid with empty ObjectType",
                  "children": []
                }
              ]
            },
            {
              "text": "A \"language\" property is a String",
              "children": [
                {
                  "text": "statement context \"language\" is numeric",
                  "children": []
                },
                {
                  "text": "statement context \"language\" is object",
                  "children": []
                },
                {
                  "text": "statement substatement context \"language\" is numeric",
                  "children": []
                },
                {
                  "text": "statement substatement context \"language\" is object",
                  "children": []
                },
                {
                  "text": "statement context \"language\" is is invalid language",
                  "children": []
                },
                {
                  "text": "statement substatement context \"language\" is is invalid language",
                  "children": []
                }
              ]
            },
            {
              "text": "A \"statement\" property is a Statement Reference",
              "children": [
                {
                  "text": "statement context \"statement\" invalid with \"statementref\"",
                  "children": []
                },
                {
                  "text": "statement context \"statement\" invalid with \"id\" not UUID",
                  "children": []
                },
                {
                  "text": "statement substatement context \"statement\" invalid with \"statementref\"",
                  "children": []
                },
                {
                  "text": "statement substatement context \"statement\" invalid with \"id\" not UUID",
                  "children": []
                }
              ]
            },
            {
              "text": "A \"contextActivities\" property's \"key\" has a value of \"parent\", \"grouping\", \"category\", or \"other\"",
              "children": [
                {
                  "text": "statement context \"contextActivities\" is \"parent\"",
                  "children": []
                },
                {
                  "text": "statement context \"contextActivities\" is \"grouping\"",
                  "children": []
                },
                {
                  "text": "statement context \"contextActivities\" is \"category\"",
                  "children": []
                },
                {
                  "text": "statement context \"contextActivities\" is \"other\"",
                  "children": []
                },
                {
                  "text": "statement context \"contextActivities\" accepts all property keys \"parent\", \"grouping\", \"category\", and \"other\"",
                  "children": []
                },
                {
                  "text": "statement context \"contextActivities\" rejects any property key other than \"parent\", \"grouping\", \"category\", or \"other\"",
                  "children": []
                },
                {
                  "text": "statement substatement context \"contextActivities\" is \"parent\"",
                  "children": []
                },
                {
                  "text": "statement substatement context \"contextActivities\" is \"grouping\"",
                  "children": []
                },
                {
                  "text": "statement substatement context \"contextActivities\" is \"category\"",
                  "children": []
                },
                {
                  "text": "statement substatement context \"contextActivities\" is \"other\"",
                  "children": []
                },
                {
                  "text": "statement substatement context \"contextActivities\" accepts all property keys \"parent\", \"grouping\", \"category\", and \"other\"",
                  "children": []
                },
                {
                  "text": "statement substatement context \"contextActivities\" rejects any property key other than \"parent\", \"grouping\", \"category\", or \"other\"",
                  "children": []
                }
              ]
            },
            {
              "text": "A \"contextActivities\" property's \"value\" is an Activity",
              "children": [
                {
                  "text": "statement context \"contextActivities parent\" value is activity array",
                  "children": []
                },
                {
                  "text": "statement context \"contextActivities grouping\" value is activity array",
                  "children": []
                },
                {
                  "text": "statement context \"contextActivities category\" value is activity array",
                  "children": []
                },
                {
                  "text": "statement context \"contextActivities other\" value is activity array",
                  "children": []
                },
                {
                  "text": "statement context contextActivities property's value is activity array with activities",
                  "children": []
                },
                {
                  "text": "statement substatement context \"contextActivities parent\" value is activity array",
                  "children": []
                },
                {
                  "text": "statement substatement context \"contextActivities grouping\" value is activity array",
                  "children": []
                },
                {
                  "text": "statement substatement context \"contextActivities category\" value is activity array",
                  "children": []
                },
                {
                  "text": "statement substatement context \"contextActivities other\" value is activity array",
                  "children": []
                },
                {
                  "text": "statement substatement context \"contextActivities property's value is activity array",
                  "children": []
                }
              ]
            },
            {
              "text": "A \"contextAgents\" property is an array of \"contextAgent\" Objects.",
              "children": [
                {
                  "text": "Statement with \"contextAgents\" property has an array of valid \"contextAgent\" Objects",
                  "children": []
                },
                {
                  "text": "Statement substatement with \"contextAgents\" property has an array of valid \"contextAgent\" Objects",
                  "children": []
                }
              ]
            },
            {
              "text": "A \"contextAgents\" Object must have an \"objectType\" property of string \"contextAgent\" and a valid Agent Object \"agent\"",
              "children": [
                {
                  "text": "Statement with \"contextAgents\" Object rejects statement if \"objectType\" property is anything other than string \"contextAgent\"",
                  "children": []
                },
                {
                  "text": "Statement with \"contextAgents\" Object rejects statement if \"agent\" property is invalid",
                  "children": []
                },
                {
                  "text": "Statement with \"contextAgents\" Object rejects statement if \"relevantTypes\" is empty",
                  "children": []
                },
                {
                  "text": "Statement with \"contextAgents\" Object rejects statement if \"relevantTypes\" contains non-IRI elements",
                  "children": []
                },
                {
                  "text": "Statement substatement with \"contextAgents\" Object rejects statement if \"objectType\" property is anything other than string \"contextAgent\"",
                  "children": []
                },
                {
                  "text": "Statement substatement with \"contextAgents\" Object rejects statement if \"agent\" property is invalid",
                  "children": []
                },
                {
                  "text": "Statement substatement with \"contextAgents\" Object rejects statement if \"relevantTypes\" is empty",
                  "children": []
                },
                {
                  "text": "Statement substatement with \"contextAgents\" Object rejects statement if \"relevantTypes\" contains non-IRI elements",
                  "children": []
                }
              ]
            },
            {
              "text": "A \"contextGroups\" property is an array of \"contextGroup\" Objects",
              "children": [
                {
                  "text": "Statement with \"contextGroups\" property has an array of valid \"contextGroup\" Objects",
                  "children": []
                },
                {
                  "text": "Statement substatement with \"contextGroups\" property has an array of valid \"contextGroup\" Objects",
                  "children": []
                }
              ]
            },
            {
              "text": "A \"contextGroups\" Object must have an \"objectType\" property of string \"contextGroup\" and a valid Group Object \"group\"",
              "children": [
                {
                  "text": "Statement with \"contextGroups\" Object rejects statement if \"objectType\" property is anything other than string \"contextGroup\"",
                  "children": []
                },
                {
                  "text": "Statement with \"contextGroups\" Object rejects statement if \"group\" property is invalid",
                  "children": []
                },
                {
                  "text": "Statement with \"contextGroups\" Object rejects statement if \"relevantTypes\" is empty",
                  "children": []
                },
                {
                  "text": "Statement with \"contextGroups\" Object rejects statement if \"relevantTypes\" contains non-IRI elements",
                  "children": []
                },
                {
                  "text": "Statement substatement with \"contextGroups\" Object rejects statement if \"objectType\" property is anything other than string \"contextGroup\"",
                  "children": []
                },
                {
                  "text": "Statement substatement with \"contextGroups\" Object rejects statement if \"group\" property is invalid",
                  "children": []
                },
                {
                  "text": "Statement substatement with \"contextGroups\" Object rejects statement if \"relevantTypes\" is empty",
                  "children": []
                },
                {
                  "text": "Statement substatement with \"contextGroups\" Object rejects statement if \"relevantTypes\" contains non-IRI elements",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS returns a ContextActivity in an array, even if only a single ContextActivity is returned",
              "children": [
                {
                  "text": "should return array for statement context \"parent\"  when single ContextActivity is passed",
                  "children": []
                },
                {
                  "text": "should return array for statement context \"grouping\"  when single ContextActivity is passed",
                  "children": []
                },
                {
                  "text": "should return array for statement context \"category\"  when single ContextActivity is passed",
                  "children": []
                },
                {
                  "text": "should return array for statement context \"other\"  when single ContextActivity is passed",
                  "children": []
                },
                {
                  "text": "should return array for statement substatement context \"parent\"  when single ContextActivity is passed",
                  "children": []
                },
                {
                  "text": "should return array for statement substatement context \"grouping\"  when single ContextActivity is passed",
                  "children": []
                },
                {
                  "text": "should return array for statement substatement context \"category\"  when single ContextActivity is passed",
                  "children": []
                },
                {
                  "text": "should return array for statement substatement context \"other\"  when single ContextActivity is passed",
                  "children": []
                }
              ]
            }
          ]
        },
        {
          "text": "Attachments Property Requirements",
          "children": [
            {
              "text": "A Statement's \"attachments\" property is an array of Attachments",
              "children": [
                {
                  "text": "statement \"attachments\" is an array",
                  "children": []
                },
                {
                  "text": "statement \"attachments\" not an array",
                  "children": []
                }
              ]
            },
            {
              "text": "An Attachment is an Object",
              "children": [
                {
                  "text": "statement \"attachment\" invalid numeric",
                  "children": []
                },
                {
                  "text": "statement \"attachment\" invalid string",
                  "children": []
                }
              ]
            },
            {
              "text": "A \"usageType\" property is an IRI",
              "children": [
                {
                  "text": "statement \"usageType\" invalid string",
                  "children": []
                }
              ]
            },
            {
              "text": "A \"contentType\" property is an Internet Media/MIME type",
              "children": [
                {
                  "text": "statement \"contentType\" invalid number",
                  "children": []
                }
              ]
            },
            {
              "text": "A \"length\" property is an Integer",
              "children": [
                {
                  "text": "statement \"length\" invalid string",
                  "children": []
                }
              ]
            },
            {
              "text": "A \"sha2\" property is a String",
              "children": [
                {
                  "text": "statement \"sha2\" invalid string",
                  "children": []
                }
              ]
            },
            {
              "text": "A \"fileUrl\" property is an IRL",
              "children": [
                {
                  "text": "statement \"fileUrl\" invalid string",
                  "children": []
                }
              ]
            },
            {
              "text": "A \"display\" property is a Language Map",
              "children": [
                {
                  "text": "statement attachment \"display\" language map numeric",
                  "children": []
                },
                {
                  "text": "statement attachment \"display\" language map string",
                  "children": []
                },
                {
                  "text": "statement attachment \"description\" language map numeric",
                  "children": []
                },
                {
                  "text": "statement attachment \"description\" language map string",
                  "children": []
                }
              ]
            }
          ]
        },
        {
          "text": "Authority Property Requirements",
          "children": [
            {
              "text": "An LRS rejects with error code 400 Bad Request, a Request whose \"authority\" is a Group and consists of non-O-Auth Agents",
              "children": []
            },
            {
              "text": "An \"authority\" property is an Agent or Group",
              "children": [
                {
                  "text": "should pass statement authority agent template",
                  "children": []
                },
                {
                  "text": "should pass statement authority template",
                  "children": []
                },
                {
                  "text": "should fail statement authority identified group (mbox)",
                  "children": []
                },
                {
                  "text": "should fail statement authority identified group",
                  "children": []
                },
                {
                  "text": "should fail statement authority identified group (openid)",
                  "children": []
                },
                {
                  "text": "should fail statement authority identified group (account)",
                  "children": []
                }
              ]
            },
            {
              "text": "An \"authority\" property which is also a Group contains exactly two Agents",
              "children": [
                {
                  "text": "statement \"authority\" invalid one member",
                  "children": []
                },
                {
                  "text": "statement \"authority\" invalid three member",
                  "children": []
                }
              ]
            },
            {
              "text": "Statement authority shall only be an anonymous group with two members",
              "children": [
                {
                  "text": "statement authority identified group is rejected",
                  "children": []
                },
                {
                  "text": "statement authority anonymous group with two members is accepted",
                  "children": []
                },
                {
                  "text": "statement authority anonymous group without two members is rejected",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS rejects with error code 400 Bad Request, a Request whose \"authority\" is a Group of more than two Agents",
              "children": [
                {
                  "text": "statement \"authority\" invalid three member",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS populates the \"authority\" property if it is not provided in the Statement, based on header information with the Agent corresponding to the user (contained within the header)",
              "children": [
                {
                  "text": "should populate authority ",
                  "children": []
                }
              ]
            }
          ]
        },
        {
          "text": "Id Property Requirements",
          "children": [
            {
              "text": "All UUID types follow requirements of RFC4122",
              "children": [
                {
                  "text": "statement \"id\" invalid UUID with too many digits",
                  "children": []
                },
                {
                  "text": "statement \"id\" invalid UUID with non A-F",
                  "children": []
                },
                {
                  "text": "statement object statementref \"id\" invalid UUID with too many digits",
                  "children": []
                },
                {
                  "text": "statement object statementref \"id\" invalid UUID with non A-F",
                  "children": []
                },
                {
                  "text": "statement context \"registration\" invalid UUID with too many digits",
                  "children": []
                },
                {
                  "text": "statement context \"registration\" invalid UUID with non A-F",
                  "children": []
                },
                {
                  "text": "statement context \"statement\" invalid UUID with too many digits",
                  "children": []
                },
                {
                  "text": "statement substatement context \"statement\" invalid UUID with non A-F",
                  "children": []
                }
              ]
            },
            {
              "text": "All UUID types are in standard String form",
              "children": [
                {
                  "text": "statement \"id\" invalid numeric",
                  "children": []
                },
                {
                  "text": "statement \"id\" invalid object",
                  "children": []
                },
                {
                  "text": "statement object statementref \"id\" invalid numeric",
                  "children": []
                },
                {
                  "text": "statement object statementref \"id\" invalid object",
                  "children": []
                },
                {
                  "text": "statement context \"registration\" invalid numeric",
                  "children": []
                },
                {
                  "text": "statement context \"registration\" invalid object",
                  "children": []
                },
                {
                  "text": "statement context \"statement\" invalid numeric",
                  "children": []
                },
                {
                  "text": "statement substatement context \"statement\" invalid object",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS generates the \"id\" property of a Statement if none is provided",
              "children": [
                {
                  "text": "should complete an empty id property",
                  "children": []
                }
              ]
            }
          ]
        },
        {
          "text": "Stored Property Requirements",
          "children": [
            {
              "text": "An LRS MUST accept statements with the stored property",
              "children": [
                {
                  "text": "using POST",
                  "children": []
                },
                {
                  "text": "using PUT",
                  "children": []
                }
              ]
            },
            {
              "text": "A stored property must be a TimeStamp",
              "children": [
                {
                  "text": "retrieve statements, test a stored property",
                  "children": []
                }
              ]
            }
          ]
        },
        {
          "text": "Timestamp Property Requirements",
          "children": [
            {
              "text": "A \"timestamp\" property is a TimeStamp",
              "children": [
                {
                  "text": "statement \"template\" invalid string",
                  "children": []
                },
                {
                  "text": "statement \"template\" invalid date",
                  "children": []
                },
                {
                  "text": "statement \"template\" future date",
                  "children": []
                },
                {
                  "text": "substatement \"template\" invalid string",
                  "children": []
                },
                {
                  "text": "substatement \"template\" invalid date",
                  "children": []
                },
                {
                  "text": "substatement \"template\" future date",
                  "children": []
                }
              ]
            }
          ]
        },
        {
          "text": "Version Property Requirements",
          "children": [
            {
              "text": "Statements returned by an LRS MUST retain the version property they are accepted with",
              "children": []
            },
            {
              "text": "An LRS rejects with error code 400 Bad Request, a Request which uses \"version\" and has the value set to anything but \"1.0\" or \"1.0.x\", where x is the semantic versioning number",
              "children": [
                {
                  "text": "statement \"version\" valid 1.0",
                  "children": []
                },
                {
                  "text": "statement \"version\" valid 1.0.9",
                  "children": []
                },
                {
                  "text": "statement \"version\" invalid string",
                  "children": []
                },
                {
                  "text": "statement \"version\" invalid 0.9.9",
                  "children": []
                },
                {
                  "text": "statement \"version\" invalid 1.1.0",
                  "children": []
                }
              ]
            }
          ]
        },
        {
          "text": "Statement Lifecycle Requirements",
          "children": [
            {
              "text": "A Voiding Statement is defined as a Statement whose \"verb\" property's \"id\" property's IRI ending with \"voided\"",
              "children": [
                {
                  "text": "statement verb voided IRI ends with \"voided\" (WARNING: this applies \"Upon receiving a Statement that voids another, the LRS SHOULD NOT* reject the request on the grounds of the Object of that voiding Statement not being present\")",
                  "children": []
                }
              ]
            },
            {
              "text": "A Voiding Statement's \"objectType\" field has a value of \"StatementRef\"",
              "children": [
                {
                  "text": "statement verb voided uses substatement with \"StatementRef\"",
                  "children": []
                },
                {
                  "text": "statement verb voided does not use object \"StatementRef\"",
                  "children": []
                }
              ]
            },
            {
              "text": "A Voided Statement is defined as a Statement that is not a Voiding Statement and is the Target of a Voiding Statement within the LRS",
              "children": [
                {
                  "text": "Should return a voided statement when using GET \"voidedStatementId\"",
                  "children": []
                },
                {
                  "text": "Should return 404 when using GET with \"statementId\"",
                  "children": []
                }
              ]
            },
            {
              "text": "A Voiding Statement cannot Target another Voiding Statement",
              "children": [
                {
                  "text": "Should not void an already voided statement",
                  "children": []
                },
                {
                  "text": "Should not void a voiding statement",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS SHALL NOT reject a voided statement because it cannot find the ID of the Object of that statement, nor does the LRS have to try to find it.",
              "children": [
                {
                  "text": "Shall not reject a voided statement.",
                  "children": []
                }
              ]
            }
          ]
        },
        {
          "text": "",
          "children": [
            {
              "text": "IRIs",
              "children": [
                {
                  "text": "When storing or comparing IRIs, LRSs shall handle them only by using one or more of the approaches described in 5.3.1 (Simple String Comparison) and 5.3.2 (Syntax-Based Normalization) of RFC 3987",
                  "children": []
                }
              ]
            },
            {
              "text": "Duration",
              "children": [
                {
                  "text": "On receiving a Duration with more than 0.01 second precision, the LRS shall not reject the request.",
                  "children": []
                },
                {
                  "text": "On receiving a Duration with more than 0.01 second precision, the LRS may truncate the duration to 0.01 second precision.",
                  "children": []
                },
                {
                  "text": "When comparing Durations (or Statements containing them), any precision beyond 0.01 second precision shall not be included in the comparison.",
                  "children": []
                }
              ]
            },
            {
              "text": "Timestamps",
              "children": [
                {
                  "text": "checks if the LRS converts timestamps to UTC",
                  "children": []
                }
              ]
            }
          ]
        },
        {
          "text": "Formatting Requirements",
          "children": [
            {
              "text": "A Statement contains an \"actor\" property",
              "children": [
                {
                  "text": "statement \"actor\" missing",
                  "children": []
                }
              ]
            },
            {
              "text": "A Statement contains a \"verb\" property",
              "children": [
                {
                  "text": "statement \"verb\" missing",
                  "children": []
                }
              ]
            },
            {
              "text": "A Statement contains an \"object\" property",
              "children": [
                {
                  "text": "statement \"object\" missing",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS rejects with error code 400 Bad Request any Statement having a property whose value is set to \"null\", except in an \"extensions\" property",
              "children": [
                {
                  "text": "statement actor should fail on \"null\"",
                  "children": []
                },
                {
                  "text": "statement verb should fail on \"null\"",
                  "children": []
                },
                {
                  "text": "statement context should fail on \"null\"",
                  "children": []
                },
                {
                  "text": "statement object should fail on \"null\"",
                  "children": []
                },
                {
                  "text": "statement activity extensions can be empty",
                  "children": []
                },
                {
                  "text": "statement result extensions can be empty",
                  "children": []
                },
                {
                  "text": "statement context extensions can be empty",
                  "children": []
                },
                {
                  "text": "statement substatement activity extensions can be empty",
                  "children": []
                },
                {
                  "text": "statement substatement result extensions can be empty",
                  "children": []
                },
                {
                  "text": "statement substatement context extensions can be empty",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS rejects with error code 400 Bad Request a Statement which uses the wrong data type",
              "children": [
                {
                  "text": "with strings where numbers are required",
                  "children": []
                },
                {
                  "text": "even if those strings contain numbers",
                  "children": []
                },
                {
                  "text": "with strings where booleans are required",
                  "children": []
                },
                {
                  "text": "even if those strings contain booleans",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS rejects with error code 400 Bad Request a Statement which uses any non-format-following key or value, including the empty string, where a string with a particular format, such as mailto IRI, UUID, or IRI, is required.",
              "children": [
                {
                  "text": "statement \"id\" invalid numeric",
                  "children": []
                },
                {
                  "text": "statement \"id\" invalid object",
                  "children": []
                },
                {
                  "text": "statement \"id\" invalid UUID with too many digits",
                  "children": []
                },
                {
                  "text": "statement \"id\" invalid UUID with non A-F",
                  "children": []
                },
                {
                  "text": "statement actor \"agent\" account \"name\" property is string",
                  "children": []
                },
                {
                  "text": "statement actor \"group\" account \"name\" property is string",
                  "children": []
                },
                {
                  "text": "statement authority \"agent\" account \"name\" property is string",
                  "children": []
                },
                {
                  "text": "statement authority \"group\" account \"name\" property is string",
                  "children": []
                },
                {
                  "text": "statement context instructor \"agent\" account \"name\" property is string",
                  "children": []
                },
                {
                  "text": "statement context instructor \"group\" account \"name\" property is string",
                  "children": []
                },
                {
                  "text": "statement context team \"group\" account \"name\" property is string",
                  "children": []
                },
                {
                  "text": "statement substatement as \"agent\" account \"name\" property is string",
                  "children": []
                },
                {
                  "text": "statement substatement as \"group\" account \"name\" property is string",
                  "children": []
                },
                {
                  "text": "statement substatement\"s \"agent\" account \"name\" property is string",
                  "children": []
                },
                {
                  "text": "statement substatement\"s \"group\" account \"name\" property is string",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor \"agent\" account \"name\" property is string",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context instructor \"group\" account \"name\" property is string",
                  "children": []
                },
                {
                  "text": "statement substatement\"s context team \"group\" account \"name\" property is string",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS rejects with error code 400 Bad Request a Statement where the case of a key does not match the case specified in this specification.",
              "children": [
                {
                  "text": "should fail when not using \"id\"",
                  "children": []
                },
                {
                  "text": "should fail when not using \"actor\"",
                  "children": []
                },
                {
                  "text": "should fail when not using \"verb\"",
                  "children": []
                },
                {
                  "text": "should fail when not using \"object\"",
                  "children": []
                },
                {
                  "text": "should fail when not using \"result\"",
                  "children": []
                },
                {
                  "text": "should fail when not using \"context\"",
                  "children": []
                },
                {
                  "text": "should fail when not using \"timestamp\"",
                  "children": []
                },
                {
                  "text": "should fail when not using \"stored\"",
                  "children": []
                },
                {
                  "text": "should fail when not using \"authority\"",
                  "children": []
                },
                {
                  "text": "should fail when not using \"version\"",
                  "children": []
                },
                {
                  "text": "should fail when not using \"attachments\"",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS rejects with error code 400 Bad Request a Statement where the case of a value restricted to enumerated values does not match an enumerated value given in this specification exactly.",
              "children": [
                {
                  "text": "when interactionType is wrong case (\"true-faLse\")",
                  "children": []
                },
                {
                  "text": "when interactionType is wrong case (\"choiCe\")",
                  "children": []
                },
                {
                  "text": "when interactionType is wrong case (\"fill-iN\")",
                  "children": []
                },
                {
                  "text": "when interactionType is wrong case (\"long-fiLl-in\")",
                  "children": []
                },
                {
                  "text": "when interactionType is wrong case (\"matchIng\")",
                  "children": []
                },
                {
                  "text": "when interactionType is wrong case (\"perfOrmance\")",
                  "children": []
                },
                {
                  "text": "when interactionType is wrong case (\"seqUencing\")",
                  "children": []
                },
                {
                  "text": "when interactionType is wrong case (\"liKert\")",
                  "children": []
                },
                {
                  "text": "when interactionType is wrong case (\"nUmeric\")",
                  "children": []
                },
                {
                  "text": "when interactionType is wrong case (\"Other\")",
                  "children": []
                }
              ]
            },
            {
              "text": "The LRS rejects with error code 400 Bad Request a token with does not validate as matching the RFC 5646 standard in the sequence of token lengths for language map keys.",
              "children": [
                {
                  "text": "statement verb \"display\" should pass given de two letter language code only",
                  "children": []
                },
                {
                  "text": "statement verb \"display\" should fail given invalid language code",
                  "children": []
                },
                {
                  "text": "statement object \"name\" should pass given de-DE language-region code",
                  "children": []
                },
                {
                  "text": "statement object \"name\" should fail given invalid language code",
                  "children": []
                },
                {
                  "text": "statement object \"description\" should pass given zh-Hant language-script code",
                  "children": []
                },
                {
                  "text": "statement object \"description\" should fail given invalid language code",
                  "children": []
                },
                {
                  "text": "interaction components' description should pass given sr-Latn-RS language-script-region code",
                  "children": []
                },
                {
                  "text": "context.language should pass given three letter cmn language code",
                  "children": []
                },
                {
                  "text": "context.language should fail given invalid language code",
                  "children": []
                },
                {
                  "text": "statement attachment \"display\" should pass given es two letter language code only",
                  "children": []
                },
                {
                  "text": "statement attachment \"display\" should fail given invalid language code",
                  "children": []
                },
                {
                  "text": "statement attachment \"description\" should pass given es-MX language-UN region code",
                  "children": []
                },
                {
                  "text": "statement attachment \"description\" should fail given es-MX invalid language code",
                  "children": []
                },
                {
                  "text": "statement substatement verb \"display\" should pass given sr-Cyrl language-script code",
                  "children": []
                },
                {
                  "text": "statement substatement verb \"display\" should fail given invalid language code",
                  "children": []
                },
                {
                  "text": "statement substatement activity \"name\" should pass given zh-Hans-CN language-script-region code",
                  "children": []
                },
                {
                  "text": "statement substatement activity \"name\" should fail given zh-z-aaa-z-bbb-c-ccc invalid (two extensions with same single-letter prefix) language code",
                  "children": []
                },
                {
                  "text": "statement substatement activity \"description\" should pass given ase three letter language code",
                  "children": []
                },
                {
                  "text": "statement substatement activity \"description\" should fail given invalid language code",
                  "children": []
                },
                {
                  "text": "substatement interaction components' description should pass given ja two letter language code only",
                  "children": []
                },
                {
                  "text": "substatement context.language should pass given two letter fr-CA language-region code",
                  "children": []
                },
                {
                  "text": "substatement context.language should fail given invalid language code",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS stores 32-bit floating point numbers with at least the precision of IEEE 754",
              "children": [
                {
                  "text": "should pass and keep precision",
                  "children": []
                }
              ]
            },
            {
              "text": "The LRS rejects with error code 400 Bad Request parameter values which do not validate to the same standards required for values of the same types in Statements",
              "children": [
                {
                  "text": "should reject when statementId value is invalid",
                  "children": []
                },
                {
                  "text": "should reject when statementId value is invalid",
                  "children": []
                },
                {
                  "text": "should reject when statementId value is invalid",
                  "children": []
                },
                {
                  "text": "should reject when statementId value is invalid",
                  "children": []
                },
                {
                  "text": "should reject when statementId value is invalid",
                  "children": []
                },
                {
                  "text": "should reject when statementId value is invalid",
                  "children": []
                }
              ]
            },
            {
              "text": "All Objects are well-created JSON Objects",
              "children": [
                {
                  "text": "An LRS rejects a not well-created JSON Object",
                  "children": []
                },
                {
                  "text": "Statements Verify Templates",
                  "children": [
                    {
                      "text": "should pass statement template",
                      "children": []
                    }
                  ]
                },
                {
                  "text": "Agents Verify Templates",
                  "children": [
                    {
                      "text": "should pass statement actor template",
                      "children": []
                    },
                    {
                      "text": "should pass statement authority template",
                      "children": []
                    },
                    {
                      "text": "should pass statement context instructor template",
                      "children": []
                    },
                    {
                      "text": "should pass statement substatement as agent template",
                      "children": []
                    },
                    {
                      "text": "should pass statement substatement\"s agent template",
                      "children": []
                    },
                    {
                      "text": "should pass statement substatement\"s context instructor template",
                      "children": []
                    }
                  ]
                },
                {
                  "text": "Groups Verify Templates",
                  "children": [
                    {
                      "text": "should pass statement actor template",
                      "children": []
                    },
                    {
                      "text": "should pass statement authority template",
                      "children": []
                    },
                    {
                      "text": "should pass statement context instructor template",
                      "children": []
                    },
                    {
                      "text": "should pass statement context team template",
                      "children": []
                    },
                    {
                      "text": "should pass statement substatement as group template",
                      "children": []
                    },
                    {
                      "text": "should pass statement substatement\"s group template",
                      "children": []
                    },
                    {
                      "text": "should pass statement substatement\"s context instructor template",
                      "children": []
                    },
                    {
                      "text": "should pass statement substatement\"s context team template",
                      "children": []
                    }
                  ]
                },
                {
                  "text": "A Group is defined by \"objectType\" of an \"actor\" property or \"object\" property with value \"Group\"",
                  "children": [
                    {
                      "text": "statement actor \"objectType\" accepts \"Group\"",
                      "children": []
                    },
                    {
                      "text": "statement authority \"objectType\" accepts \"Group\"",
                      "children": []
                    },
                    {
                      "text": "statement context instructor \"objectType\" accepts \"Group\"",
                      "children": []
                    },
                    {
                      "text": "statement context team \"objectType\" accepts \"Group\"",
                      "children": []
                    },
                    {
                      "text": "statement substatement as group \"objectType\" accepts \"Group\"",
                      "children": []
                    },
                    {
                      "text": "statement substatement\"s group \"objectType\" accepts \"Group\"",
                      "children": []
                    },
                    {
                      "text": "statement substatement\"s context instructor \"objectType\" accepts \"Group\"",
                      "children": []
                    },
                    {
                      "text": "statement substatement\"s context team \"objectType\" accepts \"Group\"",
                      "children": []
                    }
                  ]
                },
                {
                  "text": "An Anonymous Group is defined by \"objectType\" of an \"actor\" or \"object\" with value \"Group\" and by none of \"mbox\", \"mbox_sha1sum\", \"openid\", or \"account\" being used",
                  "children": [
                    {
                      "text": "statement actor does not require functional identifier",
                      "children": []
                    },
                    {
                      "text": "statement authority does not require functional identifier",
                      "children": []
                    },
                    {
                      "text": "statement context instructor does not require functional identifier",
                      "children": []
                    },
                    {
                      "text": "statement context team does not require functional identifier",
                      "children": []
                    },
                    {
                      "text": "statement substatement as group does not require functional identifier",
                      "children": []
                    },
                    {
                      "text": "statement substatement\"s group does not require functional identifier",
                      "children": []
                    },
                    {
                      "text": "statement substatement\"s context instructor does not require functional identifier",
                      "children": []
                    },
                    {
                      "text": "statement substatement\"s context team does not require functional identifier",
                      "children": []
                    }
                  ]
                },
                {
                  "text": "Verbs Verify Templates",
                  "children": [
                    {
                      "text": "should pass statement verb template",
                      "children": []
                    },
                    {
                      "text": "should pass substatement verb template",
                      "children": []
                    }
                  ]
                },
                {
                  "text": "Objects Verify Templates",
                  "children": [
                    {
                      "text": "should pass statement activity template",
                      "children": []
                    },
                    {
                      "text": "should pass statement substatement activity template",
                      "children": []
                    },
                    {
                      "text": "should pass statement agent template",
                      "children": []
                    },
                    {
                      "text": "should pass statement substatement agent template",
                      "children": []
                    },
                    {
                      "text": "should pass statement group template",
                      "children": []
                    },
                    {
                      "text": "should pass statement substatement group template",
                      "children": []
                    },
                    {
                      "text": "should pass statement StatementRef template",
                      "children": []
                    },
                    {
                      "text": "should pass statement substatement StatementRef template",
                      "children": []
                    },
                    {
                      "text": "should pass statement SubStatement template",
                      "children": []
                    }
                  ]
                },
                {
                  "text": "Activities Verify Templates",
                  "children": [
                    {
                      "text": "should pass statement activity default template",
                      "children": []
                    },
                    {
                      "text": "should pass statement substatement activity default template",
                      "children": []
                    },
                    {
                      "text": "should pass statement activity choice template",
                      "children": []
                    },
                    {
                      "text": "should pass statement activity fill-in template",
                      "children": []
                    },
                    {
                      "text": "should pass statement activity numeric template",
                      "children": []
                    },
                    {
                      "text": "should pass statement activity likert template",
                      "children": []
                    },
                    {
                      "text": "should pass statement activity long-fill-in template",
                      "children": []
                    },
                    {
                      "text": "should pass statement activity matching template",
                      "children": []
                    },
                    {
                      "text": "should pass statement activity other template",
                      "children": []
                    },
                    {
                      "text": "should pass statement activity performance template",
                      "children": []
                    },
                    {
                      "text": "should pass statement activity sequencing template",
                      "children": []
                    },
                    {
                      "text": "should pass statement activity true-false template",
                      "children": []
                    },
                    {
                      "text": "should pass statement substatement activity choice template",
                      "children": []
                    },
                    {
                      "text": "should pass statement substatement activity likert template",
                      "children": []
                    },
                    {
                      "text": "should pass statement substatement activity matching template",
                      "children": []
                    },
                    {
                      "text": "should pass statement substatement activity performance template",
                      "children": []
                    },
                    {
                      "text": "should pass statement substatement activity sequencing template",
                      "children": []
                    }
                  ]
                },
                {
                  "text": "An Activity Definition uses the following properties: name, description, type, moreInfo, interactionType, or extensions",
                  "children": [
                    {
                      "text": "statement activity \"definition\" missing all properties",
                      "children": []
                    },
                    {
                      "text": "statement activity \"definition\" contains \"name\"",
                      "children": []
                    },
                    {
                      "text": "statement activity \"definition\" contains \"description\"",
                      "children": []
                    },
                    {
                      "text": "statement activity \"definition\" contains \"type\"",
                      "children": []
                    },
                    {
                      "text": "statement activity \"definition\" contains \"moreInfo\"",
                      "children": []
                    },
                    {
                      "text": "statement activity \"definition\" contains \"extensions\"",
                      "children": []
                    },
                    {
                      "text": "statement activity \"definition\" contains \"interactionType\"",
                      "children": []
                    },
                    {
                      "text": "statement substatement activity \"definition\" missing all properties",
                      "children": []
                    },
                    {
                      "text": "statement substatement activity \"definition\" contains \"name\"",
                      "children": []
                    },
                    {
                      "text": "statement substatement activity \"definition\" contains \"description\"",
                      "children": []
                    },
                    {
                      "text": "statement substatement activity \"definition\" contains \"type\"",
                      "children": []
                    },
                    {
                      "text": "statement substatement activity \"definition\" contains \"moreInfo\"",
                      "children": []
                    },
                    {
                      "text": "statement substatement activity \"definition\" contains \"extensions\"",
                      "children": []
                    },
                    {
                      "text": "statement substatement activity \"definition\" contains \"interactionType\"",
                      "children": []
                    }
                  ]
                },
                {
                  "text": "SubStatements Verify Templates",
                  "children": [
                    {
                      "text": "should pass statement SubStatement template",
                      "children": []
                    }
                  ]
                },
                {
                  "text": "StatementRefs Verify Templates",
                  "children": [
                    {
                      "text": "should pass statement StatementRef template",
                      "children": []
                    },
                    {
                      "text": "should pass substatement StatementRef template",
                      "children": []
                    }
                  ]
                },
                {
                  "text": "Results Verify Templates",
                  "children": [
                    {
                      "text": "should pass statement result template",
                      "children": []
                    },
                    {
                      "text": "should pass substatement result template",
                      "children": []
                    }
                  ]
                },
                {
                  "text": "Contexts Verify Templates",
                  "children": [
                    {
                      "text": "should pass statement context template",
                      "children": []
                    },
                    {
                      "text": "should pass substatement context template",
                      "children": []
                    }
                  ]
                },
                {
                  "text": "A ContextActivity is defined as a single Activity of the \"value\" of the \"contextActivities\" property",
                  "children": [
                    {
                      "text": "statement context \"contextActivities parent\" value is activity",
                      "children": []
                    },
                    {
                      "text": "statement context \"contextActivities grouping\" value is activity",
                      "children": []
                    },
                    {
                      "text": "statement context \"contextActivities category\" value is activity",
                      "children": []
                    },
                    {
                      "text": "statement context \"contextActivities other\" value is activity",
                      "children": []
                    },
                    {
                      "text": "statement substatement context \"contextActivities parent\" value is activity",
                      "children": []
                    },
                    {
                      "text": "statement substatement context \"contextActivities grouping\" value is activity",
                      "children": []
                    },
                    {
                      "text": "statement substatement context \"contextActivities category\" value is activity",
                      "children": []
                    },
                    {
                      "text": "statement substatement context \"contextActivities other\" value is activity",
                      "children": []
                    }
                  ]
                },
                {
                  "text": "Languages Verify Templates",
                  "children": [
                    {
                      "text": "should pass statement verb template",
                      "children": []
                    },
                    {
                      "text": "should pass statement object template",
                      "children": []
                    },
                    {
                      "text": "should pass statement attachment template",
                      "children": []
                    },
                    {
                      "text": "should pass statement substatement verb template",
                      "children": []
                    },
                    {
                      "text": "should pass statement substatement object template",
                      "children": []
                    }
                  ]
                }
              ]
            },
            {
              "text": "An LRS rejects with error code 400 Bad Request a Statement containing IRL or IRI values without a scheme.",
              "children": [
                {
                  "text": "should fail with bad verb id scheme",
                  "children": []
                },
                {
                  "text": "should fail with bad verb openid scheme",
                  "children": []
                },
                {
                  "text": "should fail with bad account homePage",
                  "children": []
                },
                {
                  "text": "should fail with bad object id",
                  "children": []
                },
                {
                  "text": "should fail with bad object type",
                  "children": []
                },
                {
                  "text": "should fail with bad object moreInfo",
                  "children": []
                },
                {
                  "text": "should fail with attachment bad usageType",
                  "children": []
                },
                {
                  "text": "should fail with bad attachment fileUrl",
                  "children": []
                },
                {
                  "text": "should fail with bad object definition extension",
                  "children": []
                },
                {
                  "text": "should fail with bad context extension",
                  "children": []
                },
                {
                  "text": "should fail with bad result extension",
                  "children": []
                }
              ]
            }
          ]
        },
        {
          "text": "Retrieval of Statements",
          "children": [
            {
              "text": "A \"statements\" property which is too large for a single page will create a container for each additional page",
              "children": []
            },
            {
              "text": "A \"more\" property's referenced container object follows the same rules as the original GET request, originating with a single \"statements\" property and a single \"more\" property",
              "children": []
            },
            {
              "text": "An LRS's Statement API, upon processing a successful GET request, will return a single \"statements\" property and a single \"more\" property.",
              "children": [
                {
                  "text": "will return single statements property and may return",
                  "children": []
                }
              ]
            },
            {
              "text": "A \"statements\" property is an Array of Statements",
              "children": [
                {
                  "text": "should return StatementResult with statements as array using GET without \"statementId\" or \"voidedStatementId\"",
                  "children": []
                }
              ]
            },
            {
              "text": "The \"more\" property is absent or an empty string (no whitespace) if the entire results of the original GET request have been returned.",
              "children": [
                {
                  "text": "should return empty \"more\" property or no \"more\" property when all statements returned",
                  "children": []
                }
              ]
            },
            {
              "text": "If not empty, the \"more\" property's IRL refers to a specific container object corresponding to the next page of results from the orignal GET request",
              "children": [
                {
                  "text": "should return \"more\" which refers to next page of results",
                  "children": []
                }
              ]
            }
          ]
        },
        {
          "text": "Signed Statements",
          "children": [
            {
              "text": "LRS must validate and store statement signatures if they are provided",
              "children": [
                {
                  "text": "A Signed Statement MUST include a JSON web signature, JWS",
                  "children": [
                    {
                      "text": "rejects a signed statement with a malformed signature - bad content type",
                      "children": []
                    },
                    {
                      "text": "rejects a signed statement with a malformed signature - bad JWS",
                      "children": []
                    }
                  ]
                },
                {
                  "text": "The JWS signature MUST have a payload of a valid JSON serialization of the complete Statement before the signature was added.",
                  "children": [
                    {
                      "text": "rejects statement with invalid JSON serialization",
                      "children": []
                    }
                  ]
                },
                {
                  "text": "The JWS signature MUST use an algorithm of \"RS256\", \"RS384\", or \"RS512\".",
                  "children": [
                    {
                      "text": "Accepts signed statement with \"RS256\"",
                      "children": []
                    },
                    {
                      "text": "Accepts signed statement with \"RS384\"",
                      "children": []
                    },
                    {
                      "text": "Accepts signed statement with \"RS512\"",
                      "children": []
                    },
                    {
                      "text": "Rejects signed statement with another algorithm",
                      "children": []
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "text": "Special Data Types and Rules",
          "children": [
            {
              "text": "An Extension is defined as an Object of any \"extensions\" property",
              "children": [
                {
                  "text": "statement activity extensions valid boolean",
                  "children": []
                },
                {
                  "text": "statement activity extensions valid numeric",
                  "children": []
                },
                {
                  "text": "statement activity extensions valid object",
                  "children": []
                },
                {
                  "text": "statement activity extensions valid string",
                  "children": []
                },
                {
                  "text": "statement result extensions valid boolean",
                  "children": []
                },
                {
                  "text": "statement result extensions valid numeric",
                  "children": []
                },
                {
                  "text": "statement result extensions valid object",
                  "children": []
                },
                {
                  "text": "statement result extensions valid string",
                  "children": []
                },
                {
                  "text": "statement context extensions valid boolean",
                  "children": []
                },
                {
                  "text": "statement context extensions valid numeric",
                  "children": []
                },
                {
                  "text": "statement context extensions valid object",
                  "children": []
                },
                {
                  "text": "statement context extensions valid string",
                  "children": []
                },
                {
                  "text": "statement substatement activity extensions valid boolean",
                  "children": []
                },
                {
                  "text": "statement substatement activity extensions valid numeric",
                  "children": []
                },
                {
                  "text": "statement substatement activity extensions valid object",
                  "children": []
                },
                {
                  "text": "statement substatement activity extensions valid string",
                  "children": []
                },
                {
                  "text": "statement substatement result extensions valid boolean",
                  "children": []
                },
                {
                  "text": "statement substatement result extensions valid numeric",
                  "children": []
                },
                {
                  "text": "statement substatement result extensions valid object",
                  "children": []
                },
                {
                  "text": "statement substatement result extensions valid string",
                  "children": []
                },
                {
                  "text": "statement substatement context extensions valid boolean",
                  "children": []
                },
                {
                  "text": "statement substatement context extensions valid numeric",
                  "children": []
                },
                {
                  "text": "statement substatement context extensions valid object",
                  "children": []
                },
                {
                  "text": "statement substatement context extensions valid string",
                  "children": []
                }
              ]
            },
            {
              "text": "An Extension can be null, an empty string, objects with nothing in them when using POST.",
              "children": [
                {
                  "text": "statement activity extensions can be empty object",
                  "children": []
                },
                {
                  "text": "statement activity extension values can be empty string",
                  "children": []
                },
                {
                  "text": "statement activity extension values can be null",
                  "children": []
                },
                {
                  "text": "statement activity extension values can be empty object",
                  "children": []
                },
                {
                  "text": "statement result extensions can be empty object",
                  "children": []
                },
                {
                  "text": "statement result extension values can be empty string",
                  "children": []
                },
                {
                  "text": "statement result extension values can be null",
                  "children": []
                },
                {
                  "text": "statement result extension values can be empty object",
                  "children": []
                },
                {
                  "text": "statement context extensions can be empty object",
                  "children": []
                },
                {
                  "text": "statement context extensions can be empty string",
                  "children": []
                },
                {
                  "text": "statement context extensions can be null",
                  "children": []
                },
                {
                  "text": "statement context extensions can be empty object",
                  "children": []
                },
                {
                  "text": "statement substatement activity extensions can be empty object",
                  "children": []
                },
                {
                  "text": "statement substatement activity extension values can be empty string",
                  "children": []
                },
                {
                  "text": "statement substatement activity extension values can be null",
                  "children": []
                },
                {
                  "text": "statement substatement activity extension values can be empty object",
                  "children": []
                },
                {
                  "text": "statement substatement result extensions can be empty object",
                  "children": []
                },
                {
                  "text": "statement substatement result extensions can be empty string",
                  "children": []
                },
                {
                  "text": "statement substatement result extensions can be null",
                  "children": []
                },
                {
                  "text": "statement substatement result extensions can be empty object",
                  "children": []
                },
                {
                  "text": "statement substatement context extensions can be empty object",
                  "children": []
                },
                {
                  "text": "statement substatement context extensions can be empty string",
                  "children": []
                },
                {
                  "text": "statement substatement context extensions can be null",
                  "children": []
                },
                {
                  "text": "statement substatement context extensions can be empty object",
                  "children": []
                }
              ]
            },
            {
              "text": "An Extension \"key\" is an IRI",
              "children": [
                {
                  "text": "statement activity extensions key is not an IRI",
                  "children": []
                },
                {
                  "text": "statement result extensions key is not an IRI",
                  "children": []
                },
                {
                  "text": "statement context extensions key is not an IRI",
                  "children": []
                },
                {
                  "text": "statement substatement activity extensions key is not an IRI",
                  "children": []
                },
                {
                  "text": "statement substatement result extensions key is not an IRI",
                  "children": []
                },
                {
                  "text": "statement substatement context extensions key is not an IRI",
                  "children": []
                }
              ]
            },
            {
              "text": "An Extension can be null, an empty string, objects with nothing in them when using PUT.",
              "children": [
                {
                  "text": "statement activity extensions can be empty object",
                  "children": []
                },
                {
                  "text": "statement activity extension values can be empty string",
                  "children": []
                },
                {
                  "text": "statement activity extension values can be null",
                  "children": []
                },
                {
                  "text": "statement activity extensions can be empty object",
                  "children": []
                },
                {
                  "text": "statement result extensions can be empty object",
                  "children": []
                },
                {
                  "text": "statement result extension values can be empty string",
                  "children": []
                },
                {
                  "text": "statement result extension values can be null",
                  "children": []
                },
                {
                  "text": "statement result extension values can be empty object",
                  "children": []
                },
                {
                  "text": "statement context extensions can be empty object",
                  "children": []
                },
                {
                  "text": "statement context extension values can be empty string",
                  "children": []
                },
                {
                  "text": "statement context extension values can be null",
                  "children": []
                },
                {
                  "text": "statement context extension values can be empty object",
                  "children": []
                },
                {
                  "text": "statement substatement activity extensions can be empty object",
                  "children": []
                },
                {
                  "text": "statement substatement activity extension values can be empty string",
                  "children": []
                },
                {
                  "text": "statement substatement activity extension values can be null",
                  "children": []
                },
                {
                  "text": "statement substatement activity extension values can be empty object",
                  "children": []
                },
                {
                  "text": "statement substatement result extensions can be empty object",
                  "children": []
                },
                {
                  "text": "statement substatement result extension values can be empty string",
                  "children": []
                },
                {
                  "text": "statement substatement result extension values can be null",
                  "children": []
                },
                {
                  "text": "statement substatement result extension values can be empty object",
                  "children": []
                },
                {
                  "text": "statement substatement context extensions can be empty object",
                  "children": []
                },
                {
                  "text": "statement substatement context extension values can be empty string",
                  "children": []
                },
                {
                  "text": "statement substatement context extension values can be null",
                  "children": []
                },
                {
                  "text": "statement substatement context extension values can be empty object",
                  "children": []
                }
              ]
            },
            {
              "text": "A Language Map follows RFC5646",
              "children": [
                {
                  "text": "statement verb \"display\" language map invalid",
                  "children": []
                },
                {
                  "text": "statement object \"name\" language map invalid",
                  "children": []
                },
                {
                  "text": "statement object \"description\" language map invalid",
                  "children": []
                },
                {
                  "text": "statement attachment \"display\" language map invalid",
                  "children": []
                },
                {
                  "text": "statement attachment \"description\" language map invalid",
                  "children": []
                },
                {
                  "text": "statement substatement verb \"display\" language map invalid",
                  "children": []
                },
                {
                  "text": "statement substatement activity \"name\" language map invalid",
                  "children": []
                },
                {
                  "text": "statement substatement activity \"description\" language map invalid",
                  "children": []
                }
              ]
            },
            {
              "text": "A TimeStamp is defined as a Date/Time formatted according to ISO 8601",
              "children": [
                {
                  "text": "statement \"template\" invalid string in timestamp",
                  "children": []
                },
                {
                  "text": "statement \"template\" invalid date in timestamp",
                  "children": []
                },
                {
                  "text": "statement \"template\" invalid date in timestamp: did not reject statement timestamp with -00 offset",
                  "children": []
                },
                {
                  "text": "statement \"template\" invalid date in timestamp: did not reject statement timestamp with -0000 offset",
                  "children": []
                },
                {
                  "text": "statement \"template\" invalid date in timestamp: did not reject statement timestamp with -00:00 offset",
                  "children": []
                },
                {
                  "text": "Statement \"template\" valid RFC 3339 date in timestamp",
                  "children": []
                },
                {
                  "text": "substatement \"template\" invalid string in timestamp",
                  "children": []
                },
                {
                  "text": "substatement \"template\" invalid date in timestamp",
                  "children": []
                },
                {
                  "text": "substatement \"template\" invalid date in timestamp: did not reject substatement timestamp with -00 offset",
                  "children": []
                },
                {
                  "text": "substatement \"template\" invalid date in timestamp: did not reject substatement timestamp with  -0000 offset",
                  "children": []
                },
                {
                  "text": "substatement \"template\" invalid date in timestamp: did not reject substatement timestamp with  -00:00 offset",
                  "children": []
                },
                {
                  "text": "Substatement \"template\" valid RFC 3339 date in timestamp",
                  "children": []
                }
              ]
            },
            {
              "text": "A Timestamp MUST preserve precision to at least milliseconds, 3 decimal points beyond seconds.",
              "children": [
                {
                  "text": "retrieve statements, test a timestamp property",
                  "children": []
                },
                {
                  "text": "retrieve statements, test a stored property",
                  "children": []
                }
              ]
            },
            {
              "text": "A Duration MUST be expressed using the format for Duration in ISO 8601:2004(E) section 4.4.3.2.",
              "children": [
                {
                  "text": "Statement result \"duration\" property is valid",
                  "children": []
                },
                {
                  "text": "Statement substatement result \"duration\" property is valid",
                  "children": []
                },
                {
                  "text": "statement result \"duration\" property is invalid with invalid string",
                  "children": []
                },
                {
                  "text": "statement substatement result \"duration\" property is invalid",
                  "children": []
                },
                {
                  "text": "statement result \"duration\" property is invalid with invalid number",
                  "children": []
                },
                {
                  "text": "statement substatement result \"duration\" property is invalid invalid number",
                  "children": []
                },
                {
                  "text": "statement result \"duration\" property is invalid with invalid object",
                  "children": []
                },
                {
                  "text": "statement substatement result \"duration\" property is invalid with invalid object",
                  "children": []
                },
                {
                  "text": "statement result \"duration\" property is invalid with invalid duration",
                  "children": []
                },
                {
                  "text": "statement substatement result \"duration\" property is invalid with invalid duration",
                  "children": []
                },
                {
                  "text": "statement result \"duration\" property is valid with \"PT4H35M59.14S\"",
                  "children": []
                },
                {
                  "text": "statement substatement result \"duration\" property is valid with \"PT16559.14S\"",
                  "children": []
                },
                {
                  "text": "statement result \"duration\" property is valid with \"P3Y1M29DT4H35M59.14S\"",
                  "children": []
                },
                {
                  "text": "statement substatement result \"duration\" property is valid with \"P3Y\"",
                  "children": []
                },
                {
                  "text": "statement result \"duration\" property is valid with \"P4W\"",
                  "children": []
                },
                {
                  "text": "statement result \"duration\" property is invalid with \"P4W1D\"",
                  "children": []
                }
              ]
            }
          ]
        },
        {
          "text": "HEAD Request Implementation Requirements",
          "children": [
            {
              "text": "An LRS accepts HEAD requests without Content-Length headers",
              "children": []
            },
            {
              "text": "An LRS accepts GET requests without Content-Length headers",
              "children": []
            },
            {
              "text": "An LRS accepts HEAD requests",
              "children": [
                {
                  "text": "should succeed HEAD activities with no body",
                  "children": []
                },
                {
                  "text": "should succeed HEAD activities profile with no body",
                  "children": []
                },
                {
                  "text": "should succeed HEAD activities state with no body",
                  "children": []
                },
                {
                  "text": "should succeed HEAD agents with no body",
                  "children": []
                },
                {
                  "text": "should succeed HEAD agents profile with no body",
                  "children": []
                },
                {
                  "text": "should succeed HEAD statements with no body",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS responds to a HEAD request in the same way as a GET request, but without the message-body",
              "children": [
                {
                  "text": "should succeed HEAD activities with no body",
                  "children": []
                },
                {
                  "text": "should succeed HEAD activities profile with no body",
                  "children": []
                },
                {
                  "text": "should succeed HEAD activities state with no body",
                  "children": []
                },
                {
                  "text": "should succeed HEAD agents with no body",
                  "children": []
                },
                {
                  "text": "should succeed HEAD agents profile with no body",
                  "children": []
                },
                {
                  "text": "should succeed HEAD statements with no body",
                  "children": []
                }
              ]
            }
          ]
        },
        {
          "text": "Alternate Request Syntax Requirements",
          "children": [
            {
              "text": "The LRS Spec does not mandate any properties regarding Alternate Request Syntax in xAPI 2.0",
              "children": []
            }
          ]
        },
        {
          "text": "Encoding Requirements",
          "children": [
            {
              "text": "All Strings are encoded and interpreted as UTF-8",
              "children": []
            }
          ]
        },
        {
          "text": "Document Resource Requirements",
          "children": [
            {
              "text": "An LRS makes no modifications to stored data for any rejected request",
              "children": []
            },
            {
              "text": "A Document Merge overwrites any duplicate Objects from the previous document with the new document.",
              "children": []
            },
            {
              "text": "A Document Merge only performs overwrites at one level deep, although the entire object is replaced.",
              "children": []
            }
          ]
        },
        {
          "text": "Error Codes Requirements",
          "children": [
            {
              "text": "An LRS rejects with error code 400 Bad Request any request to an Resource which uses a parameter not recognized by the LRS",
              "children": []
            },
            {
              "text": "An LRS rejects with error code 400 Bad Request any request to an Resource which uses a parameter with differing case",
              "children": [
                {
                  "text": "should fail on PUT statement when not using \"statementId\"",
                  "children": []
                },
                {
                  "text": "should fail on GET statement when not using \"statementId\"",
                  "children": []
                },
                {
                  "text": "should fail on GET statement when not using \"voidedStatementId\"",
                  "children": []
                },
                {
                  "text": "should fail on GET statement when not using \"agent\"",
                  "children": []
                },
                {
                  "text": "should fail on GET statement when not using \"verb\"",
                  "children": []
                },
                {
                  "text": "should fail on GET statement when not using \"activity\"",
                  "children": []
                },
                {
                  "text": "should fail on GET statement when not using \"registration\"",
                  "children": []
                },
                {
                  "text": "should fail on GET statement when not using \"related_activities\"",
                  "children": []
                },
                {
                  "text": "should fail on GET statement when not using \"related_agents\"",
                  "children": []
                },
                {
                  "text": "should fail on GET statement when not using \"since\"",
                  "children": []
                },
                {
                  "text": "should fail on GET statement when not using \"until\"",
                  "children": []
                },
                {
                  "text": "should fail on GET statement when not using \"limit\"",
                  "children": []
                },
                {
                  "text": "should fail on GET statement when not using \"format\"",
                  "children": []
                },
                {
                  "text": "should fail on GET statement when not using \"attachments\"",
                  "children": []
                },
                {
                  "text": "should fail on GET statement when not using \"ascending\"",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS does not process any batch of Statements in which one or more Statements is rejected and if necessary, restores the LRS to the state in which it was before the batch began processing",
              "children": [
                {
                  "text": "should not persist any statements on a single failure",
                  "children": []
                }
              ]
            }
          ]
        },
        {
          "text": "Versioning Requirements",
          "children": [
            {
              "text": "An LRS sends a header response with \"X-Experience-API-Version\" as the name and the latest patch version after \"1.0.0\" as the value",
              "children": []
            },
            {
              "text": "An LRS will not modify Statements based on a \"version\" before \"1.0.1\"",
              "children": [
                {
                  "text": "should not convert newer version format to prior version format",
                  "children": []
                }
              ]
            },
            {
              "text": "An LRS rejects with error code 400 Bad Request, a Request which does not use a \"X-Experience-API-Version\" header name to any Resource except the About Resource",
              "children": [
                {
                  "text": "Should pass when About GET without header \"X-Experience-API-Version\"",
                  "children": []
                },
                {
                  "text": "Should fail when Statement GET without header \"X-Experience-API-Version\"",
                  "children": []
                },
                {
                  "text": "Should fail when Statement POST without header \"X-Experience-API-Version\"",
                  "children": []
                },
                {
                  "text": "Should fail when Statement PUT without header \"X-Experience-API-Version\"",
                  "children": []
                }
              ]
            }
          ]
        },
        {
          "text": "Authentication Requirements",
          "children": [
            {
              "text": "An LRS must support HTTP Basic Authentication",
              "children": []
            },
            {
              "text": "An LRS rejects a Statement of bad authorization, either authentication needed or failed credentials, with error code 401 Unauthorized",
              "children": [
                {
                  "text": "fails when given a random name pass pair",
                  "children": []
                },
                {
                  "text": "fails with a malformed header",
                  "children": []
                }
              ]
            }
          ]
        }
      ]
    }
  }
}