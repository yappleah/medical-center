export class AppointmentModel {
    id: number;
    date: string;
    time: string;
    description: string;
    patientId: number;

    constructor(
        id: number,
        date: string,
        time: string,
        description: string,
        patientId: number
    ) {
        this.id = id;
        this.date = date;
        this.time = time;
        this.description = description;
        this.patientId = patientId;
    }
}
