import { HttpResponse } from "@/application/web-controllers/ports"

export const created = (data: any): HttpResponse => ({
    statusCode: 201,
        body: data
})

export const badRequest = (data: any): HttpResponse => ({
    statusCode: 400,
        body: data
})
