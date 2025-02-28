<template></template>
<script>
export default {
  data() {
    return {
      crudId: this.$uid()
    }
  },
  computed: {
    crudData() {
      //Default filters
      let defaultFilters = (config('app.mode') == 'ipanel') ? {createdBy: this.$store.state.quserAuth.userId} : {}
      //Crud data
      return {
        crudId: this.crudId,
        entityName: config("main.qbooking.entityNames.services"),
        apiRoute: 'apiRoutes.qbooking.services',
        permission: 'ibooking.services',
        extraFormFields: 'ibooking.crud-fields.services',
        create: {
          title: this.$tr('ibooking.cms.newService')
        },
        read: {
          columns: [
            {name: 'id', label: this.$tr('isite.cms.form.id'), field: 'id', style: 'width: 50px'},
            {name: 'title', label: this.$tr('isite.cms.form.title'), field: 'title', align: 'rigth'},
            {
              name: 'category', label: this.$tr('isite.cms.form.category'),
              align: 'left', field: 'category', sortable: true,
              format: val => ((val && val.title) ? val.title : '-')
            },
            {name: 'status', label: this.$tr('isite.cms.form.status'), field: 'status', align: 'left'},
            {
              name: 'shiftTime', label: this.$tr('isite.cms.shiftTime'), field: 'shiftTime', align: 'left',
              format: val => val ? `${val} ${this.$trp('isite.cms.label.minute')}` : '-'
            },
            {
              name: 'price', label: this.$tr('isite.cms.form.price'), field: 'price', align: 'left',
              format: val => val ? `$${this.$trn(val)}` : 0
            },
            {
              name: 'withMeeting', label: this.$tr('isite.cms.label.meeting'), field: 'withMeeting', align: 'left',
              format: val => val ? this.$tr('isite.cms.label.yes') : this.$tr('isite.cms.label.no')
            },
            {
              name: 'form', label: this.$tr('isite.cms.label.form'), field: 'form',
              align: 'left', format: val => val ? val.title : '-'
            },
            {
              name: 'created_at', label: this.$tr('isite.cms.form.createdAt'), field: 'createdAt', align: 'left',
              format: val => val ? this.$trd(val) : '-',
            },
            {
              name: 'updated_at', label: this.$tr('isite.cms.form.updatedAt'), field: 'updatedAt', align: 'left',
              format: val => val ? this.$trd(val) : '-',
            },
            {name: 'actions', label: this.$tr('isite.cms.form.actions'), align: 'left'},
          ],
          requestParams: {include: 'category', filter: {...defaultFilters}}
        },
        update: {
          title: this.$tr('ibooking.cms.updateService'),
          requestParams: {include: 'categories', filter: {...defaultFilters}}
        },
        delete: true,
        formLeft: {
          id: {value: ''},
          userId: {value: this.$store.state.quserAuth.userId},
          title: {
            value: '',
            type: 'input',
            isTranslatable: true,
            props: {
              label: `${this.$tr('isite.cms.form.title')}*`,
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ],
            },
          },
          slug: {
            value: '',
            type: 'input',
            isTranslatable: true,
            props: {
              label: `${this.$tr('isite.cms.form.slug')}*`,
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ],
            }
          },
          formId: {
            value: null,
            type: 'select',
            props: {
              label: `${this.$tr('isite.cms.label.form')}`,
              //clearable: true,
              vIf: config('app.mode') == 'ipanel' ? false : true,
            },
            loadOptions: {
              apiRoute: 'apiRoutes.qform.forms',
              select: {label: 'title', id: 'id'}
            }
          },
          description: {
            value: '',
            type: 'html',
            isTranslatable: true,
            props: {
              label: `${this.$tr('isite.cms.form.description')}*`,
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ],
            }
          }
        },
        formRight: {
          status: {
            value: '1',
            type: 'select',
            isTranslatable: false,
            props: {
              label: `${this.$tr('isite.cms.form.status')}*`,
              options: [
                {label: this.$tr('isite.cms.label.enabled'), value: '1'},
                {label: this.$tr('isite.cms.label.disabled'), value: '0'}
              ],
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ],
            }
          },
          withMeeting: {
            value: '0',
            type: 'select',
            props: {
              label: `${this.$tr('isite.cms.label.meeting')}`,
              options: [
                {label: this.$tr('isite.cms.label.enabled'), value: '1'},
                {label: this.$tr('isite.cms.label.disabled'), value: '0'}
              ]
            }
          },
          price: {
            value: 0,
            type: 'input',
            props: {
              label: `${this.$tr('isite.cms.form.price')}`,
              type: 'number'
            },
          },
          shiftTime: {
            value: 30,
            type: 'select',
            props: {
              label: this.$tr('isite.cms.shiftTime'),
              useInput: false,
              options: this.$helper.getShiftTimeOptions({
                hour: this.$tr('isite.cms.label.hour'),
                hours: this.$trp('isite.cms.label.hour'),
                minutes: this.$trp('isite.cms.label.minute'),
                and: this.$tr('isite.cms.label.and'),
              })
            }
          },
          categoryId: {
            value: null,
            type: 'crud',
            props: {
              crudType: 'select',
              crudData: import('@imagina/qbooking/_crud/categories'),
              crudProps: {
                label: `${this.$tr('isite.cms.form.category')}*`,
                rules: [
                  val => !!val || this.$tr('isite.cms.message.fieldRequired')
                ],
              },
            },
          },
          categories: {
            value: [],
            type: 'crud',
            props: {
              crudType: 'select',
              crudData: import('@imagina/qbooking/_crud/categories'),
              crudProps: {
                label: this.$trp('isite.cms.form.category'),
                multiple: true,
                useChips: true
              },
            },
          },
          mediasSingle: {
            name: 'mediasSingle',
            value: {},
            type: 'media',
            props: {
              label: this.$tr('isite.cms.form.firstImage'),
              zone: 'mainimage',
              entity: "Modules\\Ibooking\\Entities\\Service",
              entityId: null
            }
          }
        },
      }
    },
    //Crud info
    crudInfo() {
      return this.$store.state.qcrudComponent.component[this.crudId] || {}
    }
  },
}
</script>
