FROM python:3.12

ENV PYTHONUNBUFFERED=True

RUN apt-get update && apt-get install -y libhdf5-dev && apt-get install -y libgl1-mesa-glx

WORKDIR /code

COPY requirements.txt .

RUN pip install --upgrade pip

RUN pip install --no-cache-dir --upgrade -r requirements.txt

COPY . .

CMD ["uvicorn", "main:app", "--reload", "--host", "0.0.0.0", "--port", "8000", "--proxy-headers"]