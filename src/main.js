import DefaultLayout from '~/layouts/Default.vue';
import 'prismjs/themes/prism-okaidia.css';

export default function(Vue, { head }) {
  Vue.component('Layout', DefaultLayout);

  head.meta.push({
    name: 'description',
    content:
      'The personal site of a Swedish developer with a passion for singing, web development, embedded systems and tea!'
  });
}
