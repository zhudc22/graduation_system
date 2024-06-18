# AI Image BackEnd

## 1. 项目启动

### 1.1

```bash
pip install -r requirements.txt
python app.py
# celery worker
celery -A celery_app worker --loglevel=info
# celert beat 定时任务
celery -A celery_app beat --loglevel=info
```

mac中改为

```bash
OBJC_DISABLE_INITIALIZE_FORK_SAFETY=YES celery -A celery_app worker --loglevel=info
```

### 1.2

1. docker启动

```bash
docker build -t ai-image-backend .
```

```bash
# 弃用 docker run -d -p 8000:8000 ai-image-backend

# 服务器
docker stack deploy -c docker-compose.yml ai-image-backend

# 本地
docker-compose up
```

Linux环境下需要docker 和 kubectl
    
```bash
snap install kubectl --classic
```
```bash
kubectl version --client
```

2. 项目结构

- api_test文件夹下为测试接口的代码
- local_postgres文件夹下为本地数据库的构建脚本
- model文件夹下为pydantic模型
- nltk_data文件夹下为nltk的数据
- sql文件夹下为数据库的sql文件
- tencent_cloud文件夹下为腾讯云的代码
- utils文件夹下为工具类
- app.py为项目入口文件

3. migrate

初始化配置文件

```bash
alembic init alembic
```

生成迁移脚本

```bash
alembic revision --autogenerate -m "Initial migration"
```

应用迁移脚本

```bash
alembic upgrade head
```