import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./user";

@Entity({ name: "threads" })
export class Thread {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ nullable: true })
	content: string;

	@Column({ nullable: true })
	image: string;

	@Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
	posted_at: Date;

	@ManyToOne(() => User, (user) => user.threads, {
		onUpdate: "CASCADE",
		onDelete: "CASCADE",
	})
	usersId: User;
}
