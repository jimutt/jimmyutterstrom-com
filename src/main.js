import DefaultLayout from '~/layouts/Default.vue';
import 'prismjs/themes/prism-okaidia.css';

export default function(Vue, { head }) {
  Vue.component('Layout', DefaultLayout);

  head.meta.push({
    name: 'description',
    content:
      'The personal site of a Swedish software engineer with a passion for web development, embedded systems, birding and folk music!'
  });
}
