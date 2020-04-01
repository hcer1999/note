module.exports = {
  title: '冰可乐的前端笔记',
  description: '路漫漫其修远兮,吾将上下而求索',
  dest: './dist',
  port: '7777',
  head: [
    ['link', { rel: 'icon', href: '/img/favicon.ico' }],
    ['link', { rel: 'stylesheet', href: '/style/main.css' }]
  ],
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    nav: require('./nav'),
    sidebar: require('./sidebar'),
    sidebarDepth: 2,
    lastUpdated: '上次更新',
    searchMaxSuggestoins: 10,
    serviceWorker: {
      updatePopup: {
        message: '有新的内容.',
        buttonText: '更新'
      }
    },
    smoothScroll: true,
    editLinks: true,
    editLinkText: '在 GitHub 上编辑此页 ！'
  },
  plugins: require('./plugins.js')
}
