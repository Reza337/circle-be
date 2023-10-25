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
	@JoinColumn({ name: "userId" })
	selecteduser: User;

	@OneToMany(() => Replie, (replie) => replie.selectedthread, {
		onUpdate: "CASCADE",
		onDelete: "CASCADE",
	})
	@JoinColumn()
	selectedthread: Replie[];

	@OneToMany(() => Like, (like) => like.likeToThread, {
		onUpdate: "CASCADE",
		onDelete: "CASCADE",
	})
	@JoinColumn()
	likeToThread: Like[];
}
