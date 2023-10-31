import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	OneToMany,
	JoinColumn,
} from "typeorm";
import { User } from "./user";
import { Replie } from "./replies";
import { Like } from "./like";

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
	@JoinColumn({ name: "usersId" })
	users: User;

	@OneToMany(() => Replie, (replie) => replie.threads, {
		onUpdate: "CASCADE",
		onDelete: "CASCADE",
	})
	@JoinColumn()
	replies: Replie[];

	@OneToMany(() => Like, (like) => like.threads, {
		onUpdate: "CASCADE",
		onDelete: "CASCADE",
	})
	@JoinColumn()
	likes: Like[];
}
