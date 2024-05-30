import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  Index,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { RoleEnum, ActionType, Icon, InvitationStatus, TriggerTypes } from '../../enum/data.enum';





export enum Plan {
  price_1OYxkqFj9oKEERu1NbKUxXxN = 'price_1OYxkqFj9oKEERu1NbKUxXxN',
  price_1OYxkqFj9oKEERu1KfJGWxgN = 'price_1OYxkqFj9oKEERu1KfJGWxgN',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('text')
  avatarUrl: string;

  @Column({ unique: true })
  email: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'enum', enum: RoleEnum, default: RoleEnum.SUBACCOUNT_USER })
  role: RoleEnum;

  @Column({type: 'varchar'})
  password: string;

  @Column({ nullable: true })
  agencyId: string;

  @ManyToOne(() => Agency, (agency) => agency.users, { onDelete: 'CASCADE' })
  agency: Agency;

  @OneToMany(() => Permissions, (permissions) => permissions.user)
  permissions: Permissions[];

  @OneToMany(() => Ticket, (ticket) => ticket.assignedUser)
  tickets: Ticket[];

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications: Notification[];

  @Index()
  agencyIndex: string;
}

@Entity()
@Index(['subAccountId', 'email'])
export class Permissions {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @ManyToOne(() => User, (user) => user.permissions, { onDelete: 'CASCADE' })
  user: User;

  @Column()
  subAccountId: string;

  @ManyToOne(() => SubAccount, (subAccount) => subAccount.permissions, { onDelete: 'CASCADE' })
  subAccount: SubAccount;

  @Column()
  access: boolean;

  @Index()
  subAccountIndex: string;

  @Index()
  emailIndex: string;
}

@Entity()
export class Agency {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: '' })
  connectAccountId: string;

  @Column({ default: '' })
  customerId: string;

  @Column()
  name: string;

  @Column('text')
  agencyLogo: string;

  @Column('text')
  companyEmail: string;

  @Column()
  companyPhone: string;

  @Column({ default: true })
  whiteLabel: boolean;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  zipCode: string;

  @Column()
  state: string;

  @Column()
  country: string;

  @Column({ default: 5 })
  goal: number;

  @OneToMany(() => User, (user) => user.agency)
  users: User[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => SubAccount, (subAccount) => subAccount.agency)
  subAccounts: SubAccount[];

  @OneToMany(() => AgencySidebarOption, (sidebarOption) => sidebarOption.agency)
  sidebarOptions: AgencySidebarOption[];

  @OneToMany(() => Invitation, (invitation) => invitation.agency)
  invitations: Invitation[];

  @OneToMany(() => Notification, (notification) => notification.agency)
  notifications: Notification[];

  @OneToOne(() => Subscription, (subscription) => subscription.agency)
  @JoinColumn()
  subscription: Subscription;

  @OneToMany(() => AddOns, (addOns) => addOns.agency)
  addOns: AddOns[];
}

@Entity()
@Index(['agencyId'])
export class SubAccount {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: '' })
  connectAccountId: string;

  @Column()
  name: string;

  @Column('text')
  subAccountLogo: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column('text')
  companyEmail: string;

  @Column()
  companyPhone: string;

  @Column({ default: 5 })
  goal: number;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  zipCode: string;

  @Column()
  state: string;

  @Column()
  country: string;

  @Column()
  agencyId: string;

  @ManyToOne(() => Agency, (agency) => agency.subAccounts, { onDelete: 'CASCADE' })
  agency: Agency;

  @OneToMany(() => SubAccountSidebarOption, (sidebarOption) => sidebarOption.subAccount)
  sidebarOptions: SubAccountSidebarOption[];

  @OneToMany(() => Permissions, (permissions) => permissions.subAccount)
  permissions: Permissions[];

  @OneToMany(() => Funnel, (funnel) => funnel.subAccount)
  funnels: Funnel[];

  @OneToMany(() => Media, (media) => media.subAccount)
  media: Media[];

  @OneToMany(() => Contact, (contact) => contact.subAccount)
  contacts: Contact[];

  @OneToMany(() => Trigger, (trigger) => trigger.subAccount)
  triggers: Trigger[];

  @OneToMany(() => Automation, (automation) => automation.subAccount)
  automations: Automation[];

  @OneToMany(() => Pipeline, (pipeline) => pipeline.subAccount)
  pipelines: Pipeline[];

  @OneToMany(() => Tag, (tag) => tag.subAccount)
  tags: Tag[];

  @OneToMany(() => Notification, (notification) => notification.subAccount)
  notifications: Notification[];

  
  @OneToMany(() => Ticket, (ticket) => ticket.subAccount)
  tickets: Ticket[];

  @Index()
  agencyIndex: string;
}

@Entity()
@Index(['subAccountId'])
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  color: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  subAccountId: string;

  @ManyToOne(() => SubAccount, (subAccount) => subAccount.tags, { onDelete: 'CASCADE' })
  subAccount: SubAccount;

  @OneToMany(() => Ticket, (ticket) => ticket.tags)
  tickets: Ticket[];

  @Index()
  subAccountIndex: string;
}

@Entity()
@Index(['subAccountId'])
export class Pipeline {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Lane, (lane) => lane.pipeline)
  lanes: Lane[];

  @ManyToOne(() => SubAccount, (subAccount) => subAccount.pipelines, { onDelete: 'CASCADE' })
  subAccount: SubAccount;

  @Column()
  subAccountId: string;

  @Index()
  subAccountIndex: string;
}

@Entity()
@Index(['pipelineId'])
export class Lane {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Pipeline, (pipeline) => pipeline.lanes, { onDelete: 'CASCADE' })
  pipeline: Pipeline;

  @Column()
  pipelineId: string;

  @OneToMany(() => Ticket, (ticket) => ticket.lane)
  tickets: Ticket[];

  @Column({ default: 0 })
  order: number;

  @Index()
  pipelineIndex: string;
}

@Entity()
@Index(['subAccountId', 'laneId', 'customerId', 'assignedUserId'])
export class Ticket {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column({ default: false })
  isClosed: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  subAccountId: string;

  @ManyToOne(() => SubAccount, (subAccount) => subAccount.tickets, { onDelete: 'CASCADE' })
  subAccount: SubAccount;

  @ManyToOne(() => User, (user) => user.tickets, { onDelete: 'SET NULL' })
  assignedUser: User;

  @ManyToOne(() => Lane, (lane) => lane.tickets, { onDelete: 'CASCADE' })
  lane: Lane;

  @ManyToMany(() => Tag, (tag) => tag.tickets)
  @JoinTable()
  tags: Tag[];

  @Index()
  subAccountIndex: string;

  @Index()
  laneIndex: string;
}

@Entity()
export class Trigger {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: TriggerTypes })
  type: TriggerTypes;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => SubAccount, (subAccount) => subAccount.triggers, { onDelete: 'CASCADE' })
  subAccount: SubAccount;

  @Column()
  subAccountId: string;

  @OneToMany(() => Automation, (automation) => automation.trigger)
  automations: Automation[];

  @Index()
  subAccountIndex: string;
}

@Entity()
export class Automation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => SubAccount, (subAccount) => subAccount.automations, { onDelete: 'CASCADE' })
  subAccount: SubAccount;

  @Column()
  subAccountId: string;

  @ManyToOne(() => Trigger, (trigger) => trigger.automations, { onDelete: 'CASCADE' })
  trigger: Trigger;

  @Column()
  triggerId: string;

  @OneToMany(() => AutomationInstance, (instance) => instance.automation)
  instances: AutomationInstance[];

  @OneToMany(() => Action, (action) => action.automation)
  actions: Action[];

  @Index()
  subAccountIndex: string;
}

@Entity()
export class AutomationInstance {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Automation, (automation) => automation.instances, { onDelete: 'CASCADE' })
  automation: Automation;

  @Column()
  automationId: string;

  @Index()
  automationIndex: string;
}

@Entity()
export class Action {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: ActionType })
  type: ActionType;

  @Column('text')
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Automation, (automation) => automation.actions, { onDelete: 'CASCADE' })
  automation: Automation;

  @Column()
  automationId: string;

  @Index()
  automationIndex: string;
}

@Entity()
export class Contact {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column('text')
  address: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => SubAccount, (subAccount) => subAccount.contacts, { onDelete: 'CASCADE' })
  subAccount: SubAccount;

  @Column()
  subAccountId: string;

  @OneToMany(() => Media, (media) => media.contact)
  media: Media[];

  @Index()
  subAccountIndex: string;
}

@Entity()
export class Media {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column()
  url: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => SubAccount, (subAccount) => subAccount.media, { onDelete: 'CASCADE' })
  subAccount: SubAccount;

  @Column()
  subAccountId: string;

  @ManyToOne(() => Contact, (contact) => contact.media, { onDelete: 'CASCADE' })
  contact: Contact;

  @Column()
  contactId: string;

  @Index()
  subAccountIndex: string;
}

@Entity()
export class Funnel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => FunnelPage, (page) => page.funnel)
  pages: FunnelPage[];

  @ManyToOne(() => SubAccount, (subAccount) => subAccount.funnels, { onDelete: 'CASCADE' })
  subAccount: SubAccount;

  @Column()
  subAccountId: string;

  @Index()
  subAccountIndex: string;
}

@Entity()
export class FunnelPage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text')
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Funnel, (funnel) => funnel.pages, { onDelete: 'CASCADE' })
  funnel: Funnel;

  @Column()
  funnelId: string;

  @Index()
  funnelIndex: string;
}

@Entity()
export class AgencySidebarOption {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: Icon })
  icon: Icon;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Agency, (agency) => agency.sidebarOptions, { onDelete: 'CASCADE' })
  agency: Agency;

  @Column()
  agencyId: string;

  @Index()
  agencyIndex: string;
}

@Entity()
export class SubAccountSidebarOption {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: Icon })
  icon: Icon;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => SubAccount, (subAccount) => subAccount.sidebarOptions, { onDelete: 'CASCADE' })
  subAccount: SubAccount;

  @Column()
  subAccountId: string;

  @Index()
  subAccountIndex: string;
}

@Entity()
export class Invitation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column({ type: 'enum', enum: InvitationStatus })
  status: InvitationStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Agency, (agency) => agency.invitations, { onDelete: 'CASCADE' })
  agency: Agency;

  @Column()
  agencyId: string;

  @Index()
  agencyIndex: string;
}

@Entity()
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  message: string;

  @Column()
  isRead: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.notifications, { onDelete: 'CASCADE' })
  user: User;

  @Column()
  userId: string;

  @ManyToOne(() => Agency, (agency) => agency.notifications, { onDelete: 'CASCADE' })
  agency: Agency;

  @Column()
  agencyId: string;

  @ManyToOne(() => SubAccount, (subAccount) => subAccount.notifications, { onDelete: 'CASCADE' })
  subAccount: SubAccount;

  @Column()
  subAccountId: string;

  @Index()
  userIndex: string;

  @Index()
  agencyIndex: string;

  @Index()
  subAccountIndex: string;
}

@Entity()
export class Subscription {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  subscriptionDate: Date;

  @Column({ type: 'enum', enum: Plan })
  plan: Plan;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Agency, (agency) => agency.subscription)
  agency: Agency;

  @Column()
  agencyId: string;

  @Index()
  agencyIndex: string;
}

@Entity()
export class AddOns {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  price: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Agency, (agency) => agency.addOns, { onDelete: 'CASCADE' })
  agency: Agency;

  @Column()
  agencyId: string;

  @Index()
  agencyIndex: string;
}
