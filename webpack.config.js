var webpack = require('webpack');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');

module.exports = {
    //�����
    plugins: [commonsPlugin],
    //ҳ������ļ�����
    entry: {
        index : './js/home.js'
    },
    //����ļ��������
    output: {
        path: 'dist/js/page',
        filename: '[name].js'
    },
    module: {
        //����������
        loaders: [
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            { test: /\.js$/, loader: 'jsx-loader?harmony' },
            { test: /\.scss$/, loader: 'style!css!sass?sourceMap'},
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
        ]
    },
    //���������������
    resolve: {
        root: 'C:/xampp/htdocs/dashboard/collegetutor/js', //����·��
        extensions: ['', '.js', '.json', '.scss'],
        alias: {
            AppStore : 'js/stores/AppStores.js',
            ActionType : 'js/actions/ActionType.js',
            AppAction : 'js/actions/AppAction.js'
        }
    }
};