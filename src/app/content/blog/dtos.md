---
title: O que são DTOs (Data Transfer Objects)?
description: Entenda o papel dos DTOs na arquitetura de software e como eles ajudam a melhorar a comunicação entre diferentes camadas e sistemas.
date: '2025-11-05'
categories:
  - DTOs
  - Boas Práticas
  - Arquitetura de Software
published: true
---

## Introdução aos DTOs

**Data Transfer Objects (DTOs)** - traduzidos como **Objetos de Transferência de Dados** - são estruturas simples usadas para transportar dados entre diferentes partes de um sistema, especialmente entre camadas de aplicação ou entre sistemas.

O principal objetivo dos DTOs é **encapsular os dados** de forma que possam ser facilmente transferidos, **sem expor a lógica de negócios** ou detalhes internos da aplicação. Eles são frequentemente usados em arquiteturas de software como **MVC (Model-View-Controller)** ou em **serviços web** para garantir que apenas os dados necessários sejam compartilhados.

Sem DTOs, você pode acabar passando objetos complexos (por exemplo, entidades do banco de dados) direto para o cliente.

### Exemplo: Expondo dados sensíveis

Considere uma entidade de usuário no banco de dados com **informações sensíveis**:

```ts
export class User {
	id: string;
	name: string;
	email: string;
	password: string;
	createdAt: Date;
	updatedAt: Date;
}
```

Quando a API responde ao cliente, você não quer expor **senha** ou outras informações internas. É aí que o DTO resolve esse problema:

```ts
interface UserDTO {
	id: string;
	name: string;
	email: string;
}
```

Agora sua API usa o **UserDTO** para transferir dados, garantindo segurança e eficiência.

## Por que usar DTOs?

Eles evitam o **acoplamento direto entre a lógica de negócios e os dados externos**.

### Características dos DTOs

- **Simples** - Contêm apenas os dados necessários, sem lógica de negócios
- **Imutáveis** - Uma vez criados, usados apenas para transferência de dados
- **Específicos** - Projetados para casos de uso específicos, facilitando manutenção
- **Desacoplados** - Separados de Entidades de banco de dados e lógica de negócios

### Benefícios dos DTOs

- **Clareza** - Facilita o entendimento dos dados transferidos
- **Manutenção** - Alterações centralizadas em um único lugar
- **Validação** - Permite validar dados antes do processamento

---

## Tipos de DTOs

Objetos DTOs são classificados em diferentes tipos. Os principais são:

- **Request DTO** - Representa dados recebidos de uma requisição (geralmente HTTP). Define quais dados são esperados do cliente, servindo como camada de validação.
- **Response DTO** - Define o formato enviado de volta ao cliente, garantindo que apenas dados necessários sejam expostos.

Em projetos maiores, também encontramos:

- **Update DTOs** - Para atualizar apenas determinados campos de um recurso
- **Domain DTOs** - Representam dados específicos de um domínio ou contexto
- **Pagination DTOs** - Estruturam informações de paginação (página, total, itens por página)

### Exemplo de DTOs

```ts
interface CreateUserRequestDTO {
	name: string;
	email: string;
	password: string;
}

interface UserResponseDTO {
	id: string;
	name: string;
	email: string;
}

interface DeleteUserResponseDTO {
	message: string;
	success: boolean;
}
```

## Fluxo: Controller → Service → Repository

Um fluxo comum em aplicações com arquitetura **MVC** é:

1. **Controller** recebe requisição HTTP e extrai dados
2. **Controller** cria um Request DTO com os dados extraídos
3. **Controller** passa Request DTO para o Service/camada de negócio
4. **Service** processa dados e interage com Repository para persistência
5. **Service** cria Response DTO com dados processados
6. **Controller** envia Response DTO como resposta HTTP

### Implementação do Fluxo

Começamos com a entidade do usuário:

```ts
export class User {
	id: string;
	name: string;
	email: string;
	password: string;
	createdAt: Date;
	updatedAt: Date;
}
```

DTOs:

```ts
// dtos/user.dto.ts
export interface CreateUserDTO {
	name: string;
	email: string;
	password: string;
}

export interface UserResponseDTO {
	id: string;
	name: string;
	email: string;
}
```

Repository - responsável pela persistência:

```ts
import { User } from '../entities/user.entity';
import { CreateUserDTO } from '../dtos/user.dto';
import { UUID } from 'crypto';

export class UserRepository {
	private users: User[] = [];

	create(userData: CreateUserDTO): User {
		const newUser: User = {
			id: UUID.v4(),
			...userData,
			createdAt: new Date(),
			updatedAt: new Date()
		};

		this.users.push(newUser);
		return newUser;
	}
}
```

Service - contém lógica de negócio:

```ts
import { UserRepository } from '../repositories/user.repository';
import { CreateUserDTO, UserResponseDTO } from '../dtos/user.dto';
import { User } from '../entities/user.entity';

export class UserService {
	constructor(private userRepository: UserRepository) {}

	createUser(userData: CreateUserDTO): UserResponseDTO {
		const user: User = this.userRepository.create(userData);

		const userResponse: UserResponseDTO = {
			id: user.id,
			name: user.name,
			email: user.email
		};

		return userResponse;
	}
}
```

Controller - orquestra a requisição:

```ts
import { UserService } from '../services/user.service';
import { CreateUserDTO, UserResponseDTO } from '../dtos/user.dto';
import { FastifyReply, FastifyRequest } from 'fastify';

export class UserController {
	constructor(private userService: UserService) {}

	async createUser(
		request: FastifyRequest<{ Body: CreateUserDTO }>,
		reply: FastifyReply
	) {
		const userData: CreateUserDTO = request.body;
		const userResponse: UserResponseDTO = this.userService.createUser(userData);
		return reply.code(201).send(userResponse);
	}
}
```

### Fluxo Explicado

- **Controller** recebe requisição HTTP, interpreta dados e transforma em Request DTO. Esse DTO define **exatamente o formato e campos aceitos**, garantindo consistência e validação.
- **Service** recebe Request DTO, processa conforme lógica de negócio, interage com Repository que cria o usuário e retorna a entidade completa.
- **Service** transforma entidade em Response DTO, definindo **quais dados serão expostos ao cliente**.
- **Controller** envia Response DTO como resposta HTTP, garantindo que apenas dados necessários sejam compartilhados.

## Conclusão

DTOs trazem **clareza** à forma como dados trafegam dentro da aplicação e **reduzem acoplamento** entre lógica de negócio e mundo externo (APIs, front-end, bancos). Use-os como padrão em suas arquiteturas para melhor manutenção e segurança.
