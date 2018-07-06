export class Log {

    static info(o: any, ...params: any[]) {
        if (params.length > 0) {
            console.log(o, params);
        } else {
            console.log(o);
        }
    }
}
