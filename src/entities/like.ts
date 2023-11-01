import {
	Entity,
	PrimaryGeneratedColumn,
	// Column,
	ManyToOne,
	JoinColumn,
	CreateDateColumn,
} from "typeorm";
import { User } from "./user";
import { Thread } from "./thread";

@Entity({ name: "likes" })
export class Like {
	@PrimaryGeneratedColumn()
	id!: number;

	@CreateDateColumn({ type: "timestamp with time zone" })
	created_at!: Date;

	@ManyToOne(() => User, (user) => user.likes, {
		onUpdate: "CASCADE",
		onDelete: "CASCADE",
	})
	@JoinColumn({ name: "user_id" })
	users!: User;

	@ManyToOne(() => Thread, (thread) => thread.likes, {
		onUpdate: "CASCADE",
		onDelete: "CASCADE",
	})
	@JoinColumn({ name: "thread_id" })
	threads!: Thread;
}
