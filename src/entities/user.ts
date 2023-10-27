import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	OneToMany,
	JoinColumn,
	ManyToMany,
	JoinTable,
} from "typeorm";
import { Thread } from "./thread";
import { Replie } from "./replies";
import { Like } from "./like";
import { Follow } from "./following";

@Entity({ name: "users" })
export class User {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column()
	username!: string;

	@Column()
	full_name!: string;

	@Column()
	email!: string;

	@Column({ select: false })
	password!: string;

	@Column({ nullable: true })
	profile_picture!: string;

	@Column({ nullable: true })
	profile_description!: string;

	@Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
	created_at!: Date;

	@OneToMany(() => Thread, (thread) => thread.user, {
		onUpdate: "CASCADE",
		onDelete: "CASCADE",
	})
	threads!: Thread[];

	@OneToMany(() => Replie, (replie) => replie.selecteduser, {
		onUpdate: "CASCADE",
		onDelete: "CASCADE",
	})
	@JoinColumn()
	replies!: Replie[];

	@OneToMany(() => Like, (like) => like.likeToUser, {
		onUpdate: "CASCADE",
		onDelete: "CASCADE",
	})
	@JoinColumn()
	likes!: Like[];

	@OneToMany(() => Follow, (follow) => follow.followingToUser, {
		onUpdate: "CASCADE",
		onDelete: "CASCADE",
	})
	@JoinColumn()
	followingToUser: Follow[];

	@OneToMany(() => Follow, (follow) => follow.followerToUser, {
		onUpdate: "CASCADE",
		onDelete: "CASCADE",
	})
	@JoinColumn()
	followerToUser: Follow[];

	// @ManyToMany(() => User, (user) => user.users)
	// @JoinTable({
	// 	name: "following",
	// 	joinColumn: {
	// 		name: "following_id",
	// 		referencedColumnName: "id",
	// 	},
	// 	inverseJoinColumn: {
	// 		name: "follower_id",
	// 		referencedColumnName: "id",
	// 	},
	// })
	// users!: User[];
}
