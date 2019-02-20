import {
    BaseEntity,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    Column
} from "typeorm";
import { User } from "./User";
@Entity()
export class Booking extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    public Id: string;

    @ManyToOne((type) => User, (user) => user.Bookings, { eager: true })
    public User: User;

    @Column()
    public Type: "entry" | "seat";

    @Column()
    public Price: number;

    @Column()
    public SeatId: string;

    @Column()
    public Paid: boolean;

    @Column()
    public SwishId: string;
}
