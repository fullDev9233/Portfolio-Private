FROM golang:1.17 as builder

WORKDIR /app

COPY ./serve-static-webapp ./serve-static-webapp

RUN cd serve-static-webapp && CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -ldflags="-w -s" -o ../serveStaticWebapp .

FROM scratch

WORKDIR /app

COPY --from=builder /app/serveStaticWebapp /usr/bin/

COPY build ./public

ENTRYPOINT ["serveStaticWebapp"]
