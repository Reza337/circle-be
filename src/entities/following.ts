// import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
// import { User } from "./user";

// @Entity({ name: "following" })
// export class Follow {
// 	@PrimaryGeneratedColumn()
// 	id: number;

// 	@ManyToOne(() => User, (user) => user.following, {
// 		onUpdate: "CASCADE",
// 		onDelete: "CASCADE",
// 	})
// 	@JoinColumn({ name: "following_id" })
// 	usersFollowing: User;

// 	@ManyToOne(() => User, (user) => user.follower, {
// 		onUpdate: "CASCADE",
// 		onDelete: "CASCADE",
// 	})
// 	@JoinColumn({ name: "follower_id" })
// 	usersFollower: User;
// }
