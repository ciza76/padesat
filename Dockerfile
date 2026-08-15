FROM python:3.12-alpine AS builder
RUN apk add --no-cache \
    build-base \
    postgresql-dev \
    gcc \
    python3-dev \
    libpq
WORKDIR /app
COPY docker/python/requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt --target /install
FROM python:3.12-alpine
RUN apk add --no-cache libpq
WORKDIR /app
COPY --from=builder /install /usr/local/lib/python3.12/site-packages/
COPY root/ .
CMD python -u server.py