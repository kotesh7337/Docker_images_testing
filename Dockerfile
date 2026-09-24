FROM python:alpine
WORKDIR /myapps/reddy
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["python","app.py"]
