// Inside vue.config.js
module.exports = {
    // ...other vue-cli plugin options...
    pwa: {
      name: 'Yellowins',
      themeColor: '#F9B410',
      
      manifestOptions: {
        name: 'Yellowins',
        short_name: 'Yellowins',
        start_url: './',
        scope: '.',
        display: 'standalone',
        theme_color: '#F9B410'
      },
      iconPaths: {
        favicon32: '@/assets/images/logo2.png',
      },
      msTileColor: '#000000',
      appleMobileWebAppCapable: 'yes',
      appleMobileWebAppStatusBarStyle: 'yellow',
   
     
    }
  }