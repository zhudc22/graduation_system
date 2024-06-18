
de.js 20的官方基础镜像
FROM node:20.11.1

# 设置工作目录
WORKDIR /app

# 将本地代码复制到容器中
COPY . /app

# 设置npm镜像
RUN npm config set registry https://registry.npmmirror.com

# 安装yarn和项目依赖
# RUN npm install -g yarn

# 设置Yarn使用淘宝镜像
RUN yarn config set registry 'https://registry.npmmirror.com'

# 安装项目依赖
RUN yarn install

# 构建项目
RUN yarn build

# 容器启动时运行
CMD ["yarn", "start"]

