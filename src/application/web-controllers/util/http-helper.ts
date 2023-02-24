import { HttpResponse } from "@/application/web-controllers/ports"

export const created = (data: any): HttpResponse => ({
    statusCode: 201,
        body: data
})
