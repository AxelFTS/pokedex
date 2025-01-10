import { Component, inject, Signal, signal, computed } from '@angular/core';
import { Pokemon } from './pokemon.model';
import { PokemonBorderDirective } from './pokemon-border.directive';
import { DatePipe } from '@angular/common';
import { ReversePipe } from './reverse.pipe';
import { PokemonService } from './pokemon.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PokemonBorderDirective, DatePipe, ReversePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  private readonly pokemonService = inject(PokemonService);
  pokemonList = signal(this.pokemonService.getPokemonList());
  name = signal('Pikachu');
  life = signal(21);
  imageSrc = signal(
    'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/025.png'
  );

  readonly searchTerm = signal('');

  readonly pokemonListFiltered = computed(() => {
    return this.pokemonList().filter((pokemon) =>
      pokemon.name
        .toLowerCase()
        .includes(this.searchTerm().trim().toLowerCase())
    );
  });
  filteredPokemon = this.pokemonList;

  if(searchTerm: any) {
    console.log(searchTerm.value);
  }

  size(pokemon: Pokemon) {
    if (pokemon.life <= 15) {
      return 'Petit';
    }
    if (pokemon.life >= 25) {
      return 'Grand';
    }
    return 'Moyen';
  }

  incrementLife(pokemon: Pokemon) {
    pokemon.life += 1;
  }

  decrementLife(pokemon: Pokemon) {
    pokemon.life -= 1;
  }
}
