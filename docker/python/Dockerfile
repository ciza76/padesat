FROM python:3.15.0a2-alpine3.22 AS builder
RUN apk add --update \
    py-pip \
    build-base \
    postgresql-dev \
    gcc \
    python3-dev \
    libpq
WORKDIR /app
COPY docker/python/requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt --target /install
FROM python:3.15.0a2-alpine3.22
RUN apk add --no-cache libpq
WORKDIR /app
COPY --from=builder /install /usr/local/lib/python3.15/site-packages/