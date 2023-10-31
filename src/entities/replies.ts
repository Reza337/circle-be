import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	JoinColumn,
} from "typeorm";
import { User } from "./user";
import { Thread } from "./thread";

@Entity({ name: "replies" })
export class Replie {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	content: string;

	@Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
	created_at: Date;

	@ManyToOne(() => User, (user) => user.replies, {
		onUpdate: "CASCADE",
		onDelete: "CASCADE",
	})
	@JoinColumn({ name: "user_id" })
	users: User;

	@ManyToOne(() => Thread, (thread) => thread.replies, {
		onUpdate: "CASCADE",
		onDelete: "CASCADE",
	})
	@JoinColumn({ name: "thread_id" })
	threads: Thread;
}
