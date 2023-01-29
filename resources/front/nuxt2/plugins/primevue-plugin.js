import PrimeVue from 'primevue/config'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Toast from 'primevue/toast'
import ToastService from 'primevue/toastservice'
import Menubar from 'primevue/menubar';
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import ConfirmDialog from 'primevue/confirmdialog';
import TabMenu from 'primevue/tabmenu';
import Fieldset from 'primevue/fieldset';
import Card from 'primevue/card';
import Terminal from 'primevue/terminal';
import TerminalService from 'primevue/terminalservice';
import Sidebar from 'primevue/sidebar';
import Paginator from 'primevue/paginator';
import Message from 'primevue/message';


export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.vueApp.use(PrimeVue, { ripple: true })
    nuxtApp.vueApp.use(ToastService)
    nuxtApp.vueApp.component('Button', Button)
    nuxtApp.vueApp.component('InputText', InputText)
    nuxtApp.vueApp.component('ToastService', Toast)
    nuxtApp.vueApp.component('Menubar', Menubar)
    nuxtApp.vueApp.component('Accordion', Accordion)
    nuxtApp.vueApp.component('AccordionTab', AccordionTab)
    nuxtApp.vueApp.component('ConfirmDialog', ConfirmDialog)
    nuxtApp.vueApp.component('TabMenu', TabMenu)
    nuxtApp.vueApp.component('Fieldset', Fieldset)
    nuxtApp.vueApp.component('Card', Card)
    nuxtApp.vueApp.component('Terminal', Terminal)
    nuxtApp.vueApp.component('TerminalService', TerminalService)
    nuxtApp.vueApp.component('Sidebar', Sidebar)
    nuxtApp.vueApp.component('Paginator', Paginator)
    nuxtApp.vueApp.component('Message', Message)
    //other components that you need
})


