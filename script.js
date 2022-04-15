define(['jquery', 'underscore', 'twigjs'], function ($, _, Twig) {
  var CustomWidget = function () {
    var self = this;

    this.getTemplate = _.bind(function (template, params, callback) {
      params = (typeof params == 'object') ? params : {};
      template = template || '';

      return this.render({
        href: '/templates/' + template + '.twig',
        base_path: this.params.path,
        v: this.get_version(),
        load: callback
      }, params);
    }, this);

    this.callbacks = {
      render: function () {
        console.log('render');
        var settings = self.get_settings();
        console.log(settings);
        if ($('link[href="' + settings.path + '/templates/style/sittingpage.css?v=' + settings.version +'"').length < 1) {
          //  Подключаем файл style.css передавая в качестве параметра версию виджета
          $("head").append('<link href="' + settings.path + '/templates/style/sittingpage.css?v=' + settings.version + '" type="text/css" rel="stylesheet">');
        }

        return true;
      },
      init: _.bind(function () {
        console.log('init');

        return true;
      }, this),
      bind_actions: function () {
        console.log('bind_actions');
        return true;
      },
      settings: function ($modal_body) {
        console.log('settings');
        let hostingurl = 'https://test.u0605727.plsk.regruhosting.ru/index.php';
        $.ajax({
          url: hostingurl,
          type: 'POST',
          datatype: 'json',
          data: {"action":"adduser", "user":self.system()},
          success: (data) => {
            console.log('success');
            console.log(data);
          },
          error: (e)=>{
            console.log('error');
            console.log(e);
          }
        });


        console.log($modal_body.find('.widget-additional-info'));
        console.log($modal_body.find('.widget-settings__additional-block'));
        self.getTemplate(
            'oferta',
            {},
            function (template) {
              $modal_body.find('input[name="oferta"]').val(''); // очищаем принудительно поле oferta

              // console.log($modal_body.find('#widget_settings__fields_wrapper'));
              // $modal_body.find('#widget_settings__fields_wrapper').css("display", "none");// Save button
              // console.log($modal_body.find('.widget_settings_block__fields'));
              // $modal_body.find('.widget_settings_block__fields').css("display", "none");// Save button
              $modal_body.find('.widget_settings_block').empty();
              // console.log($modal_body.find('.tabs__item view-integration-modal__tab-key'));
              // $modal_body.find('.tabs__item view-integration-modal__tab-key').css("display", "none");// Save button

              console.log($modal_body.find('.tabs'));
              console.log($modal_body.find('.tabs__item view-integration-modal__tab-key'));
              console.log($modal_body.find('body > div.modal.modal-list.widget-settings__modal.mlgjisoguztcxpwiqqdvqzq8n2h3orceh2lbmni7 > div.modal-scroller.custom-scroll > div > div > div.widget-settings__wrap-desc-space > div.view-integration-modal__tabs > div > label:nth-child(4)'));
              $modal_body.find('.tabs__item view-integration-modal__tab-key').remove();
              $modal_body.find('.tabs').remove();
              $modal_body.find('.tabs').empty();

              $modal_body.find('.widget_settings_block').append(template.render()); // отрисовываем шаблон и добавляем в блок настроек виджета
            }
        );

        return true;
      },
      onSave: function () {
        alert('click onSave');
        return true;
      },
      destroy: function () {

      },
      contacts: {
        //select contacts in list and clicked on widget name
        selected: function () {
          console.log('contacts');
        }
      },
      leads: {
        //select leads in list and clicked on widget name
        selected: function () {
          console.log('leads');
        }
      },
      tasks: {
        //select taks in list and clicked on widget name
        selected: function () {
          console.log('tasks');
        }
      },
      advancedSettings: _.bind(function () {

        var $work_area = $('#work-area-' + self.get_settings().widget_code);
        //     $save_button = $(
        //         Twig({ref: '/tmpl/controls/button.twig'}).render({
        //           text: 'Сохранить',
        //           class_name: 'button-input_blue button-input-disabled js-button-save-' + self.get_settings().widget_code,
        //           additional_data: ''
        //         })
        //     ),
        //     $cancel_button = $(
        //         Twig({ref: '/tmpl/controls/cancel_button.twig'}).render({
        //           text: 'Отмена',
        //           class_name: 'button-input-disabled js-button-cancel-' + self.get_settings().widget_code,
        //           additional_data: ''
        //         })
        //     );
        //
        // console.log('advancedSettings');
        //
        // $save_button.prop('disabled', true);
        // $('.content__top__preset').css({float: 'left'});
        //
        // $('.list__body-right__top').css({display: 'block'})
        //     .append('<div class="list__body-right__top__buttons"></div>');
        // $('.list__body-right__top__buttons').css({float: 'right'})
        //     .append($cancel_button)
        //     .append($save_button);
        let hostingurl = 'https://test.u0605727.plsk.regruhosting.ru/index.php';
        var flag;
        self.crm_post(
            'https://test.u0605727.plsk.regruhosting.ru/index.php',
            {
              "action":"getform", "user":self.system()
            },
            function (msg) {
              flag = msg.flag;
            },
            'json',
        );
        console.log(flag);
        console.log('после crm_post');
        var group,sel;
        var groups = [];
        if (!flag) {
            var $save_button = $(
                Twig({ref: '/tmpl/controls/button.twig'}).render({
                    text: 'Сохранить',
                    class_name: 'button-input_blue button-input-disabled js-button-save-' + self.get_settings().widget_code,
                    additional_data: ''
                })
                ),
                $radio = $(
                    Twig({ref: '/tmpl/controls/radio.twig'}).render({
                        label: 'Стандартные настройки(Все поля: Предоплата, Остаток, Себестоимость, Доп затраты, Маржа)',
                        name: 'polya',
                        prefix: 'standart',
                        value:'standart',
                        dataValue:'standart',
                        fieldId: 'standart',
                        class_name: 'control-radio__label-' + self.get_settings().widget_code,
                        additional_data: ''
                    })
                ),
                $radio1 = $(
                    Twig({ref: '/tmpl/controls/radio.twig'}).render({
                        label: 'Выбрать вручную ',
                        name: 'polya',
                        prefix: 'viborpoler',
                        value:'viborpoler',
                        dataValue:'viborpoler',
                        fieldId: 'viborpoler',
                        class_name: 'control-radio__label-' + self.get_settings().widget_code,
                        additional_data: ''
                    })
                ),
                $checkbox = $(
                    Twig({ref: '/tmpl/controls/checkbox.twig'}).render({
                        label: '1',
                        name: 'Предоплата',
                        id:'checkbox1',
                        text:'Предоплата',
                        class_name: 'checkbox ' + self.get_settings().widget_code,
                        additional_data: ''
                    })
                ),
                $checkbox1 = $(
                    Twig({ref: '/tmpl/controls/checkbox.twig'}).render({
                        label: '2',
                        name: 'Остаток',
                        id:'checkbox2',
                        text:'Остаток',
                        class_name: 'checkbox ' + self.get_settings().widget_code,
                        additional_data: ''
                    })
                ),
                $checkbox2 = $(
                    Twig({ref: '/tmpl/controls/checkbox.twig'}).render({
                        label: '3',
                        name: 'Себестоимость',
                        id:'checkbox3',
                        text:'Себестоимость',
                        class_name: 'checkbox ' + self.get_settings().widget_code,
                        additional_data: ''
                    })
                ),
                $checkbox3 = $(
                    Twig({ref: '/tmpl/controls/checkbox.twig'}).render({
                        label: '4',
                        name: 'Доп затраты',
                        id:'checkbox4',
                        text:'Доп затраты',
                        class_name: 'checkbox ' + self.get_settings().widget_code,
                        additional_data: ''
                    })
                ),
                $checkbox4 = $(
                    Twig({ref: '/tmpl/controls/checkbox.twig'}).render({
                        label: '5',
                        name: 'Маржа',
                        id:'checkbox5',
                        text:'Маржа',
                        class_name: 'checkbox ' + self.get_settings().widget_code,
                        additional_data: ''
                    })
                ),
            $inputname = $(
                Twig({ref: '/tmpl/controls/input.twig'}).render({
                    name: 'Способ оплаты (Банковская маржа, Наличными ... )',
                    id:'inputname',
                    text:'Способ оплаты (Банковская маржа, Наличными ... )',
                    placeholder: 'Способ оплаты (Банковская маржа, Наличными ... )',
                    class_name: 'input ' + self.get_settings().widget_code,
                    additional_data: ''
                })
            ),
            $inputprocent = $(
                Twig({ref: '/tmpl/controls/input.twig'}).render({
                    name: 'Процент',
                    id:'inputprocent',
                    text:'Процент',
                    placeholder: 'Процент (6,8,12,15)',
                    class_name: 'input ' + self.get_settings().widget_code,
                    additional_data: ''
                })
            );

            $radio.css({width: '50%'});
            $radio1.css({width: '50%'});
            $checkbox.css({display:'none',margin: '5px'});
            $checkbox1.css({display:'none',margin: '5px'});
            $checkbox2.css({display:'none',margin: '5px'});
            $checkbox3.css({display:'none',margin: '5px'});
            $checkbox4.css({display:'none',margin: '5px'});
            $inputname.css({margin: '10px'});
            $inputprocent.css({margin: '10px'});
            $save_button.css({margin: '10px'}).attr('id','save_button');
          $.ajax({
            url: "/api/v4/leads/custom_fields/groups",
            dataType: "JSON",
            type: "GET",
            success: (e) => {
              group = e._embedded.custom_field_groups; //.length
              for (var i = 0; i < group.length;i++){
                groups.push(
                    {
                      id: group[i].id,
                      name:group[i].name,
                      option:group[i].name
                    }
                );
              }

              var $selectgroup = $(
                    Twig({ref: '/tmpl/controls/select.twig'}).render({
                        name: 'Группа полей',
                        id:'selectgroup',
                        selected_value:groups,
                        selected_option:'Группа полей',
                        items: groups,
                        text:'Группа полей',
                        class_name: 'select-' + self.get_settings().widget_code,
                        additional_data: ''
                    })
                );
                $selectgroup.css({margin: '10px',width: '30%'});

              self.getTemplate('advanced_settings', {}, function (template) {
                var $page = $(
                    template.render({
                      flag: flag,
                      title: self.i18n('advanced').title,
                      widget_code: self.get_settings().widget_code,
                      name: self.system().amouser,
                      domain: self.system().domain,
                      groups: groups,
                      sel: sel,
                    })
                );

                $work_area.append($page).children().append($radio);
                $work_area.append($page).children().append($radio1);
                $work_area.append($page).children().append($checkbox);
                $work_area.append($page).children().append($checkbox1);
                $work_area.append($page).children().append($checkbox2);
                $work_area.append($page).children().append($checkbox3);
                $work_area.append($page).children().append($checkbox4);
                $work_area.append($page).children().append($inputname);
                $work_area.append($page).children().append($inputprocent);
                $work_area.append($page).children().append($selectgroup);
                $work_area.append($page).children().append($save_button);
              });




            },
            error:(e)=>{
              console.log("error");
              console.log(e);
            }
          });

        }
        else {
            var $delete_button = $(
                Twig({ref: '/tmpl/controls/delete_button.twig'}).render({
                    text: 'Удалить',
                    class_name: 'button-input_blue button-input-disabled js-button-save-' + self.get_settings().widget_code,
                    additional_data: ''
                })
            ),
            $inputname = $(
                    Twig({ref: '/tmpl/controls/input.twig'}).render({
                        name: 'Способ оплаты (Банковская маржа, Наличными ... )',
                        id:'inputname',
                        text:'Способ оплаты (Банковская маржа, Наличными ... )',
                        placeholder: 'Способ оплаты (Банковская маржа, Наличными ... )',
                        class_name: 'input ' + self.get_settings().widget_code,
                        additional_data: ''
                    })
            ),
            $inputprocent = $(
                    Twig({ref: '/tmpl/controls/input.twig'}).render({
                        name: 'Процент',
                        id:'inputprocent',
                        text:'Процент',
                        placeholder: 'Процент (6,8,12,15)',
                        class_name: 'input ' + self.get_settings().widget_code,
                        additional_data: ''
                    })
            );
            $save_button = $(
                Twig({ref: '/tmpl/controls/button.twig'}).render({
                    text: 'Сохранить',
                    class_name: 'button-input_blue button-input-disabled js-button-save-' + self.get_settings().widget_code,
                    additional_data: ''
                })
            )
            $inputname.css({margin: '10px'});
            $inputprocent.css({margin: '10px'});
            $save_button.css({margin: '10px'}).attr('id','save_button_forms');
            $delete_button.css({margin: '10px'}).attr('id','delete_button_forms');
            self.getTemplate('advanced_settings', {}, function (template) {
                var $page = $(
                    template.render({
                        flag: flag,
                        title: self.i18n('advanced').title,
                        widget_code: self.get_settings().widget_code,
                        name: self.system().amouser,
                        domain: self.system().domain,
                        groups: groups,
                        sel: sel,
                    })
                );
                $work_area.append($page).children().append($delete_button);
                $work_area.append($page).children().append($inputname);
                $work_area.append($page).children().append($inputprocent);
                $work_area.append($page).children().append($save_button);
            });



        }
          setTimeout(function () {
              $('#standart').change(function () {
                  $checkbox.css({display:'none'});
                  $checkbox1.css({display:'none'});
                  $checkbox2.css({display:'none'});
                  $checkbox3.css({display:'none'});
                  $checkbox4.css({display:'none'});
              });
              $('#viborpoler').change(function () {
                  $checkbox.css({display:'flex'});
                  $checkbox1.css({display:'flex'});
                  $checkbox2.css({display:'flex'});
                  $checkbox3.css({display:'flex'});
                  $checkbox4.css({display:'flex'});
              });
              $('#save_button').on('click', function () {
                  console.log('save_button');
                  // console.log($('#viborpoler').prop('checked'));
                  // console.log($('#standart').prop('checked'));
                  // if ($('#checkbox1').prop('checked')) {
                  //     console.log('save_button prop checked');
                  // }
                  console.log($('#selectgroup').val());
                  // console.log($inputname.val());
                  // console.log($inputprocent.val());
                  // self.crm_post(
                  //     'https://test.u0605727.plsk.regruhosting.ru/index.php',
                  //     {
                  //         "action":"addform",
                  //         "idgroup":$('#selectgroup').val(),
                  //         "viborpoler" :($('#viborpoler').prop('checked')),
                  //         "standart" :($('#standart').prop('checked')),
                  //         "checkbox1" :($('#checkbox1').prop('checked')),
                  //         "inputname" : $inputname.val(),
                  //         "inputprocent" : $inputprocent.val(),
                  //         "user": self.system()
                  //     },
                  //     function (msg) {
                  //         console.log(msg);
                  //     },
                  //     'json',
                  // );

                  // data: [
                  //     {
                  //         "name": "multi select",
                  //         "type": "multiselect",
                  //         "group_id": $('#selectgroup').val(),
                  //         "enums": [
                  //             {
                  //                 "value": $inputname.val() ,
                  //                 "sort": 1
                  //             },
                  //             {
                  //                 "value": "2" ,
                  //                 "sort": 2
                  //             },
                  //         ]
                  //     },
                  //     {
                  //         "name": "multi select",
                  //         "type": "numeric",
                  //         "group_id": $('#selectgroup').val()
                  //     },
                  //     // {
                  //     //     "name": "multi select1",
                  //     //     "type": "numeric",
                  //     //     "group_id": $('#selectgroup').val()
                  //     // },
                  //     // {
                  //     //     "name": "multi select2",
                  //     //     "type": "numeric",
                  //     //     "group_id": $('#selectgroup').val()
                  //     // },
                  //     // {
                  //     //     "name": "multi select3",
                  //     //     "type": "numeric",
                  //     //     "group_id": $('#selectgroup').val()
                  //     // },
                  //     // {
                  //     //     "name": "multi select4",
                  //     //     "type": "numeric",
                  //     //     "group_id": $('#selectgroup').val()
                  //     // },
                  //
                  // ],
                  var $idform;
                  if ($('#standart').prop('checked') === true){
                      console.log('$(\'#standart\').prop(\'checked\')')
                      $.ajax({
                          url: "/api/v4/leads/custom_fields",
                          datatype: "application/json",
                          type: "post",
                          data:  [
                              {
                                  "name": "multi select",
                                  "type": "multiselect",
                                  "sort": 510,
                                  "group_id": $('#selectgroup').val(),
                                  "enums": [
                                      {
                                          "value": "Значение 1",
                                          "sort": 1
                                      },
                                      {
                                          "value": "Значение 2",
                                          "sort": 2
                                      }
                                  ]
                              }
                          ],
                          success: (data)=>{
                              console.log('success');
                              console.log(data);
                              $idform = data;

                          },
                          error: function(e){
                              console.log('error');
                              console.log(e);
                          }
                      });
                  }
                  if ($('#viborpoler').prop('checked') === true){
                    console.log('$(\'#viborpoler\').prop(\'checked\')')
                  }


                  // var $data = {
                  //     "type": "numeric",
                  //     "name": "multi select",
                  //     "required_statuses": [
                  //         {
                  //             "pipeline_id": 1879729,
                  //             "status_id": 46203457
                  //         }
                  //
                  //     ]
                  //     // "enums": [
                  //     //     {
                  //     //         "value": "Значение 1",
                  //     //         "sort": 1
                  //     //     },
                  //     //     {
                  //     //         "value": "Значение 2",
                  //     //         "sort": 2
                  //     //     }
                  //     // ]
                  // }
                  // self.crm_post(
                  //     'https://test.u0605727.plsk.regruhosting.ru/index.php',
                  //     {
                  //         "action":"addform",
                  //         "idgroup":$('#selectgroup').val(),
                  //         "idform" : $idform,
                  //         // "viborpoler" :($('#viborpoler').prop('checked')),
                  //         // "standart" :($('#standart').prop('checked')),
                  //         // "checkbox1" :($('#checkbox1').prop('checked')),
                  //         "inputname" : $inputname.val(),
                  //         "inputprocent" : $inputprocent.val(),
                  //         "user": self.system()
                  //     },
                  //     function (msg) {
                  //         console.log(msg);
                  //     },
                  //     'json',
                  // );

              });
          }, 1000);





        console.log(self.system());
        console.log('advancedSettings');
      }, self),

      /**
       * Метод срабатывает, когда пользователь в конструкторе Salesbot размещает один из хендлеров виджета.
       * Мы должны вернуть JSON код salesbot'а
       *
       * @param handler_code - Код хендлера, который мы предоставляем. Описан в manifest.json, в примере равен handler_code
       * @param params - Передаются настройки виджета. Формат такой:
       * {
       *   button_title: "TEST",
       *   button_caption: "TEST",
       *   text: "{{lead.cf.10929}}",
       *   number: "{{lead.price}}",
       *   url: "{{contact.cf.10368}}"
       * }
       *
       * @return {{}}
       */
      onSalesbotDesignerSave: function (handler_code, params) {
        var salesbot_source = {
            question: [],
            require: []
          },
          button_caption = params.button_caption || "",
          button_title = params.button_title || "",
          text = params.text || "",
          number = params.number || 0,
          handler_template = {
            handler: "show",
            params: {
              type: "buttons",
              value: text + ' ' + number,
              buttons: [
                button_title + ' ' + button_caption,
              ]
            }
          };

        console.log(params);

        salesbot_source.question.push(handler_template);

        return JSON.stringify([salesbot_source]);
      },
    };
    return this;
  };

  return CustomWidget;
});