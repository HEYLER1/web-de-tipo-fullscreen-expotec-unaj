const webpack = require('webpack');
require('dotenv').config(); // Asegúrate de que dotenv esté instalado

module.exports = {
  // Otras configuraciones...
  plugins: [
    new webpack.DefinePlugin({
      'process.env.REACT_APP_SUPABASE_URL': JSON.stringify(process.env.REACT_APP_SUPABASE_URL),
      'process.env.REACT_APP_SUPABASE_ANON_KEY': JSON.stringify(process.env.REACT_APP_SUPABASE_ANON_KEY),
    }),
  ],
};

