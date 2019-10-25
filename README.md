# 梁才军-Web前端-18518451835 ThoughtWorks Homework

## 项目依赖安装
执行命令：`npm install`

## 运行项目
执行命令：`npm start`<br>
项目会运行在 [http://localhost:3000](http://localhost:3000)，通过浏览器打开浏览。

## 项目打包
执行命令：`npm run build`<br>
打包生成的文件在项目根目录 `build` 文件夹中。

## 项目部署
你可以通过像 `serve` 这样的静态服务器工具包部署打包好的项目。如果你没有，可以安装它：`npm install -g serve`。<br>
当然，你也可以使用别的方式，如 `nginx`，将项目部署起来。<br>
在项目根目录下执行命令：`serve -s build`<br>
项目会启动在 [http://localhost:5000](http://localhost:5000)，通过浏览器打开浏览。

## 使用 nginx 沟通后端服务
当前端项目部署以后，你并不能立即使用它，因为它现在只有画面，没有数据。<br>
你还需要把后端 `mock-server` 部署起来！<br>
当然，仅此还不够。你还需要使用 `nginx` 作为代理服务器来连接前后端。<br>
以下是一份简易的 **nginx 配置**，你可以直接使用它。将它复制到 `nginx.conf` 的 `http` 块里，然后启动 `nginx`。<br>

	server {
		listen	5001;

	    location / {
			#前端服务所在地址
	        proxy_pass http://localhost:5000;
	    }

	    location /agents {
			#后端服务所在地址
	        proxy_pass http://localhost:3001;
	    }

		location /history {
			#后端服务所在地址
	        proxy_pass http://localhost:3001;
	    }
    }
这样，你可以通过浏览器访问 [http://localhost:5001](http://localhost:5001) 享受完整的项目体验！<br>
当然，你也可以选择别的工具作为代理服务器。

## 额外说明
该项目是在 *Windows* 平台完成的，未测试其它平台，因此在别的平台上进行浏览可能会出现平台带来的兼容性问题（哪怕你使用同一款浏览器同一个版本！）。<br>
此外，该项目使用 *Chrome* 浏览器最新版本来开发调试，使用 *Chrome* 高版本进行浏览可获得最佳体验。<br>
项目兼容 *IE11* 和 *Edge* 浏览器。<br>
另外，建议在屏幕分辨率 `1366*768` 及以上进行浏览可获得最佳页面效果。如果浏览器宽度低于 1366 像素，会出现横向滚动条，为了在有限时间里确保项目页面美观，项目页面最小宽度被定格为 1366px。

### End